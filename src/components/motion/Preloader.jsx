import { finishIntro, gsap, lockScroll, reducedMotion, useGSAP } from '../../lib/motion'

// Tempo mínimo (desde o início da navegação) com a marca na tela, mesmo em conexões rápidas
const MIN_VISIBLE_MS = 1400

const timeout = (ms) => new Promise((r) => setTimeout(r, ms))

// Espera a foto do hero estar baixada e decodificada (com limite, para não travar)
const heroReady = () => {
  const img = document.querySelector('[data-hero-img]')
  if (!img) return Promise.resolve()
  const loaded = img.complete
    ? Promise.resolve()
    : new Promise((r) => {
        img.addEventListener('load', r, { once: true })
        img.addEventListener('error', r, { once: true })
      })
  const decoded = loaded.then(() => img.decode?.()).catch(() => {})
  return Promise.race([decoded, timeout(3000)])
}

// Dois quadros: o navegador conclui o primeiro layout/pintura antes de animarmos
const nextFrames = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))

/**
 * A abertura é HTML/CSS puro no index.html — aparece antes do JavaScript e anima
 * na GPU enquanto o site é montado. Este componente só assume o final: completa o
 * contador até 100%, abre as cortinas e libera o hero quando tudo está pronto.
 */
const Preloader = () => {
  useGSAP(() => {
    const el = document.getElementById('preloader')
    if (!el || reducedMotion()) {
      el?.remove()
      lockScroll('intro', false)
      finishIntro()
      return
    }

    lockScroll('intro', true)
    window.scrollTo(0, 0)
    el.style.animation = 'none' // desliga a trava de segurança do CSS: o JS chegou

    let tl
    let cancelled = false
    const minTime = timeout(Math.max(0, MIN_VISIBLE_MS - performance.now()))

    Promise.all([heroReady(), minTime, nextFrames()]).then(() => {
      if (cancelled) return
      const q = gsap.utils.selector(el)
      const num = el.querySelector('[data-num]')
      const bar = el.querySelector('[data-bar]')

      // Assume de onde as animações CSS pararam, para não haver salto
      const pct = parseInt(getComputedStyle(num).getPropertyValue('--pl-pct'), 10) || 0
      const scale = new DOMMatrixReadOnly(getComputedStyle(bar).transform).a || 0
      q('[data-logo], [data-tag], [data-meta], [data-bar], [data-num]').forEach((n) => (n.style.animation = 'none'))
      num.style.setProperty('--pl-pct', pct)
      gsap.set(bar, { scaleX: scale, transformOrigin: 'left center' })

      const counter = { v: pct }
      tl = gsap.timeline({
        defaults: { ease: 'expo.inOut' },
        onComplete: () => {
          el.remove()
          lockScroll('intro', false)
        },
      })
      tl.to(counter, {
        v: 100,
        duration: 0.45,
        ease: 'power2.out',
        onUpdate: () => num.style.setProperty('--pl-pct', Math.round(counter.v)),
      })
        .to(bar, { scaleX: 1, duration: 0.45, ease: 'power2.out' }, '<')
        .to(q('[data-logo], [data-tag], [data-meta]'), { yPercent: -110, duration: 0.6, ease: 'expo.in', stagger: 0.03 }, '-=0.05')
        .add(() => finishIntro(), '-=0.15')
        .to(q('[data-panel="top"]'), { yPercent: -100, duration: 1.1 }, '<')
        .to(q('[data-panel="bottom"]'), { yPercent: 100, duration: 1.1 }, '<')
        .to(q('[data-redline], [data-bar]'), { opacity: 0, duration: 0.6 }, '<')
    })

    return () => {
      cancelled = true
      tl?.kill()
    }
  }, [])

  return null
}

export default Preloader

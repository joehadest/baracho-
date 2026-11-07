import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger, reducedMotion, scrollToTarget, setLenis } from '../../lib/motion'

/**
 * Scroll suave com Lenis, sincronizado ao ticker do GSAP para que
 * os ScrollTriggers (pin, scrub, parallax) fiquem perfeitamente alinhados.
 * Também intercepta links "#âncora" para rolar suavemente com offset do header.
 */
const SmoothScroll = () => {
  useEffect(() => {
    let lenis = null

    if (!reducedMotion()) {
      lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, anchors: false })
      setLenis(lenis)
      lenis.on('scroll', ScrollTrigger.update)
      const raf = (time) => lenis.raf(time * 1000)
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)
      lenis.__raf = raf
    }

    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return
      const link = e.target.closest('a[href^="#"]')
      if (!link) return
      const hash = link.getAttribute('href')
      const target = hash === '#' || hash === '#home' ? 0 : document.querySelector(hash)
      if (target === null) return
      e.preventDefault()
      scrollToTarget(target)
      history.replaceState(null, '', hash)
    }
    document.addEventListener('click', onClick)

    // Fontes e imagens alteram alturas → recalcula os gatilhos
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('load', onLoad)
      if (lenis) {
        gsap.ticker.remove(lenis.__raf)
        lenis.destroy()
        setLenis(null)
      }
    }
  }, [])

  return null
}

export default SmoothScroll

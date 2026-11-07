import { useRef, useState } from 'react'
import { finishIntro, gsap, lockScroll, reducedMotion, useGSAP } from '../../lib/motion'

/**
 * Abertura: contador 0 → 100, logo e duas cortinas que se abrem revelando o hero.
 * Com "reduzir movimento" o preloader é pulado.
 */
const Preloader = () => {
  const root = useRef(null)
  const [done, setDone] = useState(() => typeof window !== 'undefined' && reducedMotion())

  useGSAP(
    () => {
      if (done) {
        finishIntro()
        return
      }
      lockScroll('intro', true)
      window.scrollTo(0, 0)

      const counter = { v: 0 }
      const num = root.current.querySelector('[data-num]')

      const tl = gsap.timeline({
        defaults: { ease: 'expo.inOut' },
        onComplete: () => {
          lockScroll('intro', false)
          setDone(true)
        },
      })

      tl.from('[data-logo]', { yPercent: 110, duration: 0.9, ease: 'expo.out' })
        .from('[data-tag]', { yPercent: 110, duration: 0.9, ease: 'expo.out' }, '<0.1')
        .to(counter, {
          v: 100,
          duration: 1.5,
          ease: 'power2.inOut',
          onUpdate: () => (num.textContent = String(Math.round(counter.v)).padStart(3, '0')),
        }, 0.1)
        .to('[data-bar]', { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0.1)
        .to('[data-logo], [data-tag], [data-meta]', { yPercent: -110, duration: 0.7, ease: 'expo.in', stagger: 0.04 })
        .add(() => finishIntro(), '-=0.05')
        .to('[data-panel="top"]', { yPercent: -100, duration: 1.1 }, '<')
        .to('[data-panel="bottom"]', { yPercent: 100, duration: 1.1 }, '<')
        .to('[data-redline], [data-bar]', { opacity: 0, duration: 0.6 }, '<')
    },
    { scope: root }
  )

  if (done) return null

  return (
    <div ref={root} className="fixed inset-0 z-[200] text-white" aria-hidden="true">
      <div data-panel="top" className="absolute inset-x-0 top-0 h-1/2 bg-ink-950" />
      <div data-panel="bottom" className="absolute inset-x-0 bottom-0 h-1/2 bg-ink-950" />
      <div data-redline className="absolute inset-x-0 top-1/2 h-px bg-brand-500" />

      <div className="absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center">
          <div className="overflow-hidden">
            <p data-logo className="font-display text-[clamp(3.5rem,12vw,9rem)] leading-[0.95] font-extrabold tracking-tight">
              BARACHO<span className="text-brand-500">.</span>
            </p>
          </div>
          <div className="overflow-hidden">
            <p data-tag className="font-mono text-[0.65rem] tracking-[0.4em] text-zinc-400 uppercase sm:text-xs">
              Soluções e Serviços
            </p>
          </div>
        </div>
      </div>

      <div className="container-x absolute inset-x-0 bottom-8 flex items-end justify-between">
        <div className="overflow-hidden">
          <p data-meta className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Desde 2013</p>
        </div>
        <div className="overflow-hidden">
          <p data-meta className="font-display text-6xl leading-none font-bold tabular-nums sm:text-8xl">
            <span data-num>000</span>
            <span className="text-brand-500">%</span>
          </p>
        </div>
      </div>
      <div data-bar className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-brand-500" />
    </div>
  )
}

export default Preloader

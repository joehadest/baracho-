import { useRef } from 'react'
import { gsap, MQ, ScrollTrigger, primeTransforms, useGSAP } from '../../lib/motion'

const items = [
  'Isolamento Térmico',
  'Isolamento Acústico',
  'Proteção Passiva',
  'Alpinismo Industrial',
  'Pintura Industrial',
  'Solda e Caldeira',
  'Refratário',
  'Estrutura Metálica',
]

const Star = ({ className }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M12 2l2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6z" fill="currentColor" />
  </svg>
)

const Row = ({ hidden, star }) => (
  <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
    {items.map((item) => (
      <li key={item} className="flex items-center gap-8 pr-8 font-display text-2xl font-bold tracking-wide whitespace-nowrap uppercase sm:text-4xl">
        {item}
        <Star className={star} />
      </li>
    ))}
  </ul>
)

/**
 * Duas faixas cruzadas que correm em sentidos opostos.
 * A velocidade do scroll acelera as faixas e inverte o sentido ao rolar para cima.
 */
const Marquee = () => {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        primeTransforms(root.current, '[data-track], [data-band]')
        const tracks = gsap.utils.toArray('[data-track]')
        const loops = tracks.map((track, i) =>
          gsap.fromTo(
            track,
            { xPercent: i === 0 ? 0 : -50 },
            { xPercent: i === 0 ? -50 : 0, duration: 40, ease: 'none', repeat: -1 }
          ).totalTime(4000) // folga para poder inverter o sentido sem "travar" no início
        )

        let direction = 1
        // Fora da tela as faixas ficam pausadas (não gastam CPU à toa)
        const play = (self) => loops.forEach((loop) => (self.isActive ? loop.resume() : loop.pause()))
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: play,
          onRefresh: play,
          onUpdate: (self) => {
            const v = self.getVelocity()
            if (self.direction !== direction) direction = self.direction
            const boost = gsap.utils.clamp(1, 7, 1 + Math.abs(v) / 220)
            loops.forEach((loop) => {
              gsap.to(loop, { timeScale: direction * boost, duration: 0.2, overwrite: true })
              gsap.to(loop, { timeScale: direction, duration: 1.2, delay: 0.2, ease: 'power2.out' })
            })
          },
        })

        // As faixas se inclinam mais conforme passam pela tela
        gsap.fromTo('[data-band="a"]', { '--tilt': '-5deg' }, { '--tilt': '-1.5deg', ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
        gsap.fromTo('[data-band="b"]', { '--tilt': '5deg' }, { '--tilt': '1.5deg', ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })

        return () => st.kill()
      })
    },
    { scope: root }
  )

  return (
    <div ref={root} className="relative z-10 -my-6 overflow-hidden py-16 sm:py-24">
      <div data-band="b" className="absolute inset-x-[-10%] top-1/2 -translate-y-1/2 [--tilt:2deg] [rotate:var(--tilt)] border-y border-line-strong bg-ink-900 py-4 text-zinc-500">
        <div data-track className="flex w-max">
          <Row hidden star="text-brand-500" />
          <Row hidden star="text-brand-500" />
        </div>
      </div>
      <div data-band="a" className="relative mx-[-10%] [--tilt:-2deg] [rotate:var(--tilt)] border-y border-brand-700 bg-brand-500 py-4 text-white shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)]">
        <div data-track className="flex w-max">
          <Row star="text-ink-950" />
          <Row hidden star="text-ink-950" />
        </div>
      </div>
    </div>
  )
}

export default Marquee

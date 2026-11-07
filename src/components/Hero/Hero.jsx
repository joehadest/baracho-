import { useRef } from 'react'
import { gsap, MQ, onIntroDone, SplitText, useGSAP } from '../../lib/motion'
import Roll from '../ui/Roll'

const features = [
  {
    title: '12+ anos',
    text: 'de experiência em campo',
    icon: <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
  },
  {
    title: 'Segurança',
    text: 'como prioridade absoluta',
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  },
  {
    title: 'Todo o Brasil',
    text: 'atendimento nacional',
    icon: <path d="M13 10V3L4 14h7v7l9-11h-7z" />,
  },
]

const lines = [
  { text: 'Soluções' },
  { text: 'industriais com' },
  { text: 'segurança', accent: true },
]

const Hero = () => {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MQ.motion, () => {
        const split = SplitText.create('[data-hero-line]', { type: 'chars', charsClass: 'hero-char' })

        gsap.set(split.chars, { yPercent: 115, rotate: 6 })
        gsap.set('[data-hero-fade]', { autoAlpha: 0, y: 30 })
        gsap.set('[data-hero-media]', { clipPath: 'inset(18% 22% 18% 22% round 28px)' })
        gsap.set('[data-hero-img]', { scale: 1.35 })
        gsap.set('[data-hero-feature]', { autoAlpha: 0, y: 40 })

        const intro = gsap.timeline({ paused: true })
        intro
          .to('[data-hero-media]', { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.8, ease: 'expo.inOut' })
          .to('[data-hero-img]', { scale: 1.08, duration: 2.4, ease: 'expo.out' }, '<0.2')
          .to(split.chars, { yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.022 }, '<0.55')
          .to('[data-hero-fade]', { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1 }, '<0.35')
          .to('[data-hero-feature]', { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, '<0.2')

        onIntroDone(() => intro.play())

        // Saída cinematográfica ao rolar: foto aproxima, texto sobe e desfoca
        const out = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
        out
          .to('[data-hero-parallax]', { yPercent: 18, ease: 'none' }, 0)
          .to('[data-hero-content]', { yPercent: -35, autoAlpha: 0, filter: 'blur(6px)', ease: 'none' }, 0)
          .to('[data-hero-strip]', { yPercent: 60, autoAlpha: 0, ease: 'none' }, 0)

        return () => split.revert()
      })
    },
    { scope: root }
  )

  return (
    <section ref={root} id="home" className="relative isolate flex min-h-svh flex-col overflow-hidden bg-ink-950 bg-noise">
      {/* Foto de fundo */}
      <div data-hero-parallax className="absolute inset-0 -z-10">
        <div data-hero-media className="absolute inset-0 overflow-hidden">
          <img
            data-hero-img
            src="/images/projects/alphinismo/alphinismo 1.jpg"
            alt=""
            fetchPriority="high"
            className="h-full w-full scale-105 object-cover object-[70%_center] opacity-70 grayscale-[35%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/60" />
        </div>
        <div className="absolute inset-0 bg-blueprint opacity-60" />
        <div className="absolute -bottom-40 -left-40 size-[36rem] rounded-full bg-brand-600/25 blur-[120px]" />
      </div>

      <div data-hero-content className="container-x flex flex-1 flex-col justify-center pt-32 pb-16">
        <div className="max-w-4xl">
          <p data-hero-fade className="eyebrow">Desde 2013 · Serviços industriais</p>

          <h1 className="mt-6 font-display text-[clamp(3.25rem,9vw,8.5rem)] leading-[0.86] font-extrabold tracking-tight text-white uppercase">
            {lines.map((line) => (
              <span key={line.text} className="line-clip block">
                <span data-hero-line className={`block ${line.accent ? 'text-brand-500' : ''}`}>
                  {line.text}
                  {line.accent && <span className="text-white">.</span>}
                </span>
              </span>
            ))}
          </h1>

          <p data-hero-fade className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-300 sm:text-xl">
            Isolamento térmico e acústico, proteção passiva, alpinismo e pintura industrial — executados
            com rigor técnico e excelência em cada etapa.
          </p>

          <div data-hero-fade className="mt-10 flex flex-wrap gap-3">
            <a href="#projects" className="btn btn-primary" data-magnetic="0.3">
              <Roll>Conheça nossos projetos</Roll>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#contact" className="btn btn-ghost" data-magnetic="0.3">
              <Roll>Pedir orçamento</Roll>
            </a>
          </div>
        </div>
      </div>

      {/* Indicador de rolagem */}
      <div data-hero-fade className="pointer-events-none absolute right-6 bottom-36 hidden flex-col items-center gap-4 lg:flex xl:right-10">
        <span className="font-mono text-[0.65rem] tracking-[0.3em] text-zinc-500 uppercase [writing-mode:vertical-rl]">Role</span>
        <span className="scroll-cue relative h-16 w-px overflow-hidden bg-line-strong" />
      </div>

      {/* Faixa de destaques */}
      <div data-hero-strip className="relative border-t border-line bg-ink-950/60 backdrop-blur-md">
        <div className="container-x grid divide-line sm:grid-cols-3 sm:divide-x">
          {features.map((f) => (
            <div
              key={f.title}
              data-hero-feature
              className="flex items-center gap-4 border-b border-line py-5 last:border-b-0 sm:border-b-0 sm:px-8 sm:py-7 sm:first:pl-0"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-500/10 text-brand-400 ring-1 ring-brand-500/30">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {f.icon}
                </svg>
              </span>
              <div>
                <p className="font-display text-xl font-bold tracking-wide text-white uppercase">{f.title}</p>
                <p className="text-sm text-zinc-400">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero

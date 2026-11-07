import { useRef } from 'react'
import { gsap, MQ, useGSAP } from '../../lib/motion'
import SectionHeading from '../ui/SectionHeading'

const pillars = [
  {
    title: 'Nossa História',
    text: 'Desde 2013, a Baracho Soluções e Serviços tem sido referência em serviços industriais, construindo um legado de confiança e excelência.',
  },
  {
    title: 'Nossa Missão',
    text: 'Ser líder nacional em serviços industriais, com foco em excelência, eficiência e proteção ambiental.',
  },
  {
    title: 'Nossa Visão',
    text: 'Ser referência em qualidade, inovação e sustentabilidade no setor industrial.',
  },
]

const values = [
  'Amar a Deus acima de tudo',
  'Excelência em produtos e serviços',
  'Inovação constante',
  'Sustentabilidade e economia de energia',
  'Segurança como prioridade',
  'Integridade e ética nas relações',
  'Responsabilidade social',
]

const About = () => {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        // Foto revelada por uma "cortina" + parallax interno
        gsap.fromTo(
          '[data-about-photo]',
          { clipPath: 'inset(100% 0% 0% 0% round 24px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 24px)', duration: 1.6, ease: 'expo.inOut', scrollTrigger: { trigger: '[data-about-photo]', start: 'top 80%', once: true } }
        )
        gsap.fromTo(
          '[data-about-img]',
          { yPercent: -10, scale: 1.25 },
          { yPercent: 10, scale: 1.1, ease: 'none', scrollTrigger: { trigger: '[data-about-photo]', start: 'top bottom', end: 'bottom top', scrub: true } }
        )
        gsap.from('[data-about-badge]', {
          xPercent: -40,
          autoAlpha: 0,
          duration: 1.2,
          delay: 0.9,
          scrollTrigger: { trigger: '[data-about-photo]', start: 'top 80%', once: true },
        })

        // Pilares: linha desenha e conteúdo sobe
        gsap.utils.toArray('[data-pillar]').forEach((el) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } })
          tl.from(el.querySelector('[data-pillar-line]'), { scaleX: 0, duration: 1.4, ease: 'expo.inOut' })
            .from(el.querySelectorAll('[data-pillar-in]'), { y: 40, autoAlpha: 0, stagger: 0.08, duration: 1.1 }, '<0.3')
        })

        gsap.from('[data-value]', {
          x: -20,
          autoAlpha: 0,
          stagger: 0.06,
          duration: 0.9,
          scrollTrigger: { trigger: '[data-values]', start: 'top 80%', once: true },
        })
      })
    },
    { scope: root }
  )

  return (
    <section ref={root} id="about" className="relative scroll-mt-20 overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute top-0 right-0 -z-10 h-[40rem] w-[40rem] bg-blueprint opacity-50" />

      <div className="container-x">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Coluna esquerda */}
          <div>
            <SectionHeading index="02" eyebrow="Sobre nós" title={<>Experiência que <span className="text-brand-500">sustenta</span> a indústria</>}>
              Somos especialistas em serviços industriais, atendendo clientes em todo o Brasil com segurança, técnica e
              compromisso.
            </SectionHeading>

            <div data-about-photo className="relative mt-12 overflow-hidden rounded-3xl ring-1 ring-line">
              <img
                data-about-img
                src="/images/projects/pintura industrial/pintura industrial 1.jpg"
                alt="Profissional da Baracho realizando pintura industrial por pulverização"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
              <div data-about-badge className="absolute bottom-5 left-5 rounded-2xl bg-brand-500 px-5 py-4 shadow-2xl">
                <p className="font-mono text-[0.65rem] tracking-[0.2em] text-white/80 uppercase">Fundada em</p>
                <p className="font-display text-3xl leading-none font-bold text-white">22.02.2013</p>
              </div>
            </div>
          </div>

          {/* Coluna direita */}
          <div className="flex flex-col justify-end">
            <ol className="border-b border-line">
              {pillars.map((p, i) => (
                <li key={p.title} data-pillar className="group relative grid grid-cols-[3rem_1fr] gap-4 py-8">
                  <span data-pillar-line className="absolute inset-x-0 top-0 h-px origin-left bg-line-strong" />
                  <span data-pillar-in className="font-mono text-sm text-brand-400">0{i + 1}</span>
                  <div data-pillar-in>
                    <h3 className="font-display text-3xl font-bold text-white uppercase transition-colors group-hover:text-brand-400">
                      {p.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-zinc-400">{p.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div data-values className="reveal mt-12 rounded-3xl border border-line bg-ink-900 p-8 sm:p-10">
              <h3 className="eyebrow">Nossos valores</h3>
              <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {values.map((value) => (
                  <li key={value} data-value className="flex items-start gap-3 text-zinc-200">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-brand-500" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

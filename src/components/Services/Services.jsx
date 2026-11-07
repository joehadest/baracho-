import { useRef } from 'react'
import { gsap, MQ, useGSAP } from '../../lib/motion'
import SectionHeading from '../ui/SectionHeading'
import Roll from '../ui/Roll'

// Holofote: passa a posição do mouse para o CSS (.spotlight)
const trackPointer = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

const services = [
  {
    title: 'Isolamento Térmico',
    description: 'Isolamento de linhas, vasos, tanques, trocadores e permutadores industriais com materiais de alta performance.',
    icon: (
      <>
        <path d="M12 2v4M12 18v4M6 12H2M22 12h-4M19.07 4.93l-2.83 2.83M7.76 16.24l-2.83 2.83M19.07 19.07l-2.83-2.83M7.76 7.76L4.93 4.93" />
        <circle cx="12" cy="12" r="4" />
      </>
    ),
  },
  {
    title: 'Isolamento Acústico',
    description: 'Soluções eficientes para controle e redução de ruídos em ambientes, dutos e equipamentos industriais.',
    icon: (
      <>
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        <path d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" />
      </>
    ),
  },
  {
    title: 'Proteção Passiva',
    description: 'Proteção contra incêndio para estruturas metálicas e sistemas de segurança em plantas industriais.',
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
  {
    title: 'Alpinismo Industrial',
    description: 'Acesso por cordas para inspeção, limpeza, pintura e isolamento em altura com técnica e total segurança.',
    icon: (
      <>
        <path d="M12 2v6" />
        <circle cx="12" cy="11" r="3" />
        <path d="M12 14v8M8 18l4-4 4 4" />
      </>
    ),
  },
  {
    title: 'Pintura Industrial',
    description: 'Jateamento abrasivo, tratamento anticorrosivo e pintura por pulverização em estruturas e equipamentos.',
    icon: (
      <>
        <path d="M14.5 2L20 7.5 7.5 20H2v-5.5L14.5 2z" />
        <path d="M13 3l6 6" />
      </>
    ),
  },
  {
    title: 'Solda e Caldeira',
    description: 'Serviços de solda de alta qualidade, montagem e manutenção de caldeiras, fornos e chaminés.',
    icon: (
      <>
        <path d="M12 2c1 3 4 5 4 9a4 4 0 01-8 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 0-8z" />
        <path d="M5 22h14" />
      </>
    ),
  },
]

const Services = () => {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        gsap.from('[data-service] > :not([data-service-bar])', {
          y: 60,
          autoAlpha: 0,
          duration: 1.3,
          stagger: 0.05,
          scrollTrigger: { trigger: '[data-services-grid]', start: 'top 80%', once: true },
        })
        gsap.from('[data-service-icon]', {
          scale: 0,
          rotate: -90,
          duration: 1.2,
          ease: 'back.out(2)',
          stagger: 0.09,
          delay: 0.3,
          scrollTrigger: { trigger: '[data-services-grid]', start: 'top 80%', once: true },
        })
        // A grade se "abre" de baixo para cima
        gsap.fromTo(
          '[data-services-grid]',
          { clipPath: 'inset(12% 0% 0% 0% round 24px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 24px)', ease: 'none', scrollTrigger: { trigger: '[data-services-grid]', start: 'top 95%', end: 'top 45%', scrub: true } }
        )
      })
    },
    { scope: root }
  )

  return (
    <section ref={root} id="services" className="relative scroll-mt-20 border-t border-line bg-ink-900 py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading index="01" eyebrow="Serviços" title={<>O que fazemos <span className="text-brand-500">de melhor</span></>}>
            Da especificação à execução em campo, entregamos soluções industriais completas com segurança e qualidade.
          </SectionHeading>
          <a href="#contact" className="btn btn-ghost self-start lg:self-end" data-magnetic="0.3">
            <Roll>Solicitar visita técnica</Roll>
          </a>
        </div>

        <div data-services-grid className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <article
              key={service.title}
              data-service
              onPointerMove={trackPointer}
              className="spotlight group relative flex flex-col bg-ink-900 p-8 transition-colors duration-500 hover:bg-ink-850 sm:p-10"
            >
              <span data-service-bar className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand-500 transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-x-100" />

              <div className="flex items-start justify-between">
                <span className="font-mono text-sm text-zinc-500">{String(i + 1).padStart(2, '0')}</span>
                <span data-service-icon className="grid size-14 place-items-center rounded-2xl border border-line-strong text-zinc-300 transition-colors duration-500 group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {service.icon}
                  </svg>
                </span>
              </div>

              <h3 className="mt-14 font-display text-3xl font-bold text-white uppercase">{service.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-zinc-400">{service.description}</p>

              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 self-start text-sm font-semibold text-zinc-300 transition-colors hover:text-brand-400"
              >
                Solicitar orçamento
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                  <path d="M5 12h14m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

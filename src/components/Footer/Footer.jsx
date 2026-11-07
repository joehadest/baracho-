import { useEffect, useRef, useState } from 'react'
import { gsap, MQ, scrollToTarget, useGSAP } from '../../lib/motion'
import Roll from '../ui/Roll'

const columns = [
  {
    title: 'Serviços',
    links: [
      ['Isolamento Térmico', '#services'],
      ['Isolamento Acústico', '#services'],
      ['Proteção Passiva', '#services'],
      ['Alpinismo Industrial', '#services'],
      ['Pintura Industrial', '#services'],
      ['Solda e Caldeira', '#services'],
    ],
  },
  {
    title: 'Empresa',
    links: [
      ['Sobre nós', '#about'],
      ['Missão e visão', '#about'],
      ['Valores', '#about'],
      ['Projetos', '#projects'],
      ['Contato', '#contact'],
    ],
  },
]

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/barachorn',
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/5584999263052',
    icon: <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />,
  },
]

const Footer = () => {
  const year = new Date().getFullYear()
  const [showTop, setShowTop] = useState(false)
  const root = useRef(null)

  // Letras gigantes sobem uma a uma e "acendem" em vermelho ao chegar no fim da página
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: '[data-wordmark]', start: 'top bottom', end: 'max', scrub: 1 },
        })
        tl.from('[data-letter]', { yPercent: 100, stagger: 0.08, duration: 1 })
          .to('[data-letter-fill]', { clipPath: 'inset(0% 0% 0% 0%)', stagger: 0.08, duration: 1 }, 0.4)
      })
    },
    { scope: root }
  )

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <footer ref={root} className="relative overflow-hidden border-t border-line bg-ink-900">
      <div className="container-x py-20">
        {/* CTA */}
        <div className="reveal flex flex-col items-start justify-between gap-8 border-b border-line pb-16 lg:flex-row lg:items-end">
          <h2 className="heading-xl max-w-3xl text-white">
            Pronto para o <span className="text-brand-500">próximo</span> projeto?
          </h2>
          <a href="#contact" className="btn btn-primary shrink-0" data-magnetic="0.3">
            <Roll>Solicitar orçamento</Roll>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="grid gap-12 pt-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src="/images/logo/BARACHO.png" alt="" className="size-12 object-contain" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-3xl font-bold tracking-wide text-white">BARACHO</span>
                <span className="font-mono text-[0.6rem] tracking-[0.28em] text-brand-400 uppercase">Soluções e Serviços</span>
              </span>
            </div>
            <p className="mt-6 max-w-xs leading-relaxed text-zinc-400">
              Desde 2013, oferecendo soluções industriais com excelência, segurança e compromisso com nossos clientes.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-full border border-line-strong text-zinc-300 transition hover:border-brand-500 hover:bg-brand-500 hover:text-white"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-zinc-300 transition-colors hover:text-brand-400">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Contato rápido</h3>
            <ul className="mt-5 space-y-3 text-zinc-300">
              <li>
                <a href="tel:+5584999263052" className="transition-colors hover:text-brand-400">(84) 9 9926-3052</a>
              </li>
              <li>
                <a href="mailto:comercial@barachorn.com" className="transition-colors hover:text-brand-400">comercial@barachorn.com</a>
              </li>
              <li className="text-zinc-400">Desde 22/02/2013</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Marca d'água */}
      <p
        data-wordmark
        aria-hidden="true"
        className="pointer-events-none flex justify-center overflow-hidden font-display text-[22vw] leading-[0.8] font-extrabold tracking-tight select-none"
      >
        {'BARACHO'.split('').map((letter, i) => (
          <span key={i} data-letter className="relative inline-block">
            <span className="text-outline">{letter}</span>
            <span data-letter-fill className="absolute inset-0 text-brand-500 [clip-path:inset(100%_0%_0%_0%)]">
              {letter}
            </span>
          </span>
        ))}
      </p>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-sm text-zinc-500 sm:flex-row">
          <p>&copy; {year} Baracho Soluções e Serviços. Todos os direitos reservados.</p>
          <p className="font-mono text-xs tracking-[0.15em] uppercase">Segurança · Excelência · Compromisso</p>
        </div>
      </div>

      <button
        onClick={() => scrollToTarget(0, { offset: 0 })}
        aria-label="Voltar ao topo"
        className={`fixed right-5 bottom-5 z-40 grid size-12 place-items-center rounded-full bg-brand-500 text-white shadow-[0_12px_32px_-8px_var(--color-brand-500)] transition-all duration-500 hover:bg-brand-400 sm:right-8 sm:bottom-8 ${
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
        }`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 19V5m0 0l-7 7m7-7l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </footer>
  )
}

export default Footer

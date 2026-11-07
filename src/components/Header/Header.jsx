import { useEffect, useState } from 'react'
import { lockScroll } from '../../lib/motion'
import Roll from '../ui/Roll'

const navItems = [
  { name: 'Início', href: '#home' },
  { name: 'Serviços', href: '#services' },
  { name: 'Sobre', href: '#about' },
  { name: 'Projetos', href: '#projects' },
  { name: 'Contato', href: '#contact' },
]

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('#home')
  const [hidden, setHidden] = useState(false)

  // Fundo ao rolar + esconde ao descer / reaparece ao subir
  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 400)
        lastY = y
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Destaca o link da seção visível
  useEffect(() => {
    const sections = navItems.map((i) => document.querySelector(i.href)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    lockScroll('menu', menuOpen)
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-(--ease-out-expo) ${
        hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'
      } ${
        scrolled || menuOpen
          ? 'border-b border-line bg-ink-950/80 py-3 backdrop-blur-xl'
          : 'border-b border-transparent py-5'
      }`}
    >
      <div className="container-x flex items-center justify-between gap-6">
        <a href="#home" onClick={close} className="group flex items-center gap-3" aria-label="Baracho - início">
          <img src="/images/logo/BARACHO.png" alt="" className="size-11 object-contain transition-transform duration-500 group-hover:rotate-[-8deg]" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-2xl font-bold tracking-wide text-white">BARACHO</span>
            <span className="font-mono text-[0.6rem] tracking-[0.28em] text-brand-400 uppercase">Soluções e Serviços</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href ? 'true' : undefined}
              className="relative rounded-full px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white aria-[current]:text-white"
            >
              <Roll>{item.name}</Roll>
              <span
                className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-brand-500 transition-transform duration-500 ${
                  active === item.href ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contact" className="btn btn-primary hidden !py-2.5 sm:inline-flex" data-magnetic="0.25">
            <Roll>Pedir orçamento</Roll>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            className="relative grid size-11 place-items-center rounded-full border border-line-strong lg:hidden"
          >
            <span className={`absolute h-0.5 w-5 bg-white transition-transform duration-300 ${menuOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
            <span className={`absolute h-0.5 w-5 bg-white transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`absolute h-0.5 w-5 bg-white transition-transform duration-300 ${menuOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
          </button>
        </div>
      </div>
    </header>

      {/* Menu mobile — fora do <header>: o backdrop-blur criaria um containing block para o position:fixed */}
      <div
        className={`fixed inset-0 z-40 bg-ink-950 pt-[4.25rem] transition-all duration-500 lg:hidden ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <nav className="container-x flex h-full flex-col justify-between py-10" aria-label="Menu mobile">
          <ul className="flex flex-col">
            {navItems.map((item, i) => (
              <li key={item.href} className="border-b border-line">
                <a
                  href={item.href}
                  onClick={close}
                  className={`flex items-baseline gap-4 py-5 font-display text-4xl font-bold uppercase transition-all duration-500 ${
                    menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  } ${active === item.href ? 'text-brand-500' : 'text-white'}`}
                  style={{ transitionDelay: menuOpen ? `${80 + i * 50}ms` : '0ms' }}
                >
                  <span className="font-mono text-xs text-zinc-500">0{i + 1}</span>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={close} className="btn btn-primary w-full">
            Pedir orçamento
          </a>
        </nav>
      </div>
    </>
  )
}

export default Header

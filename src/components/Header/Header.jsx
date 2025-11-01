import React, { useState } from 'react'
import './Header.css'

const Header = ({ scrolled }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { name: 'Início', href: '#home' },
    { name: 'Serviços', href: '#services' },
    { name: 'Sobre', href: '#about' },
    { name: 'Projetos', href: '#projects' },
    { name: 'Contato', href: '#contact' },
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
  }

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container container">
        <a href="#home" className="header__logo" onClick={(e) => handleNavClick(e, '#home')}>
          <img src="/images/logo/BARACHO.png" alt="Baracho Soluções" className="header__logo-img" />
        </a>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__nav-list">
            {navItems.map((item, index) => (
              <li key={index} className="header__nav-item">
                <a 
                  href={item.href} 
                  className="header__nav-link"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <a 
            href="#contact" 
            className="header__cta"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Pedir Orçamento
          </a>
        </nav>

        <button 
          className={`header__menu-btn ${menuOpen ? 'header__menu-btn--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Header

import React, { useEffect, useState } from 'react'
import './Hero.css'

const Hero = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const scrollToContact = (e) => {
    e.preventDefault()
    const element = document.querySelector('#contact')
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
  }

  const scrollToProjects = (e) => {
    e.preventDefault()
    const element = document.querySelector('#projects')
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="hero">
      <div className="hero__overlay"></div>
      <div className="hero__background">
        <img src="/images/banners/banner.png" alt="Baracho Soluções" className="hero__bg-image" />
      </div>
      
      <div className={`hero__content container ${loaded ? 'hero__content--loaded' : ''}`}>
        <div className="hero__text">
          <h1 className="hero__title">
            <span className="hero__title-main">Soluções Industriais</span>
            <span className="hero__title-sub">com Segurança e Excelência</span>
          </h1>
          <p className="hero__description">
            Isolamento térmico e acústico, proteção passiva, alpinismo e pintura industrial desde 2013.
          </p>
          <div className="hero__cta-group">
            <a href="#projects" className="hero__cta hero__cta--primary" onClick={scrollToProjects}>
              <span>Conheça nossos projetos</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#contact" className="hero__cta hero__cta--secondary" onClick={scrollToContact}>
              <span>Pedir orçamento</span>
            </a>
          </div>
        </div>

        <div className="hero__features">
          <div className="hero__feature">
            <div className="hero__feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M9 12L11 14L15 10M21 12C21 16.971 16.971 21 12 21C7.029 21 3 16.971 3 12C3 7.029 7.029 3 12 3C16.971 3 21 7.029 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="hero__feature-text">
              <h3>12+ Anos</h3>
              <p>de Experiência</p>
            </div>
          </div>

          <div className="hero__feature">
            <div className="hero__feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 6V12L16 14M22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="hero__feature-text">
              <h3>Segurança</h3>
              <p>como Prioridade</p>
            </div>
          </div>

          <div className="hero__feature">
            <div className="hero__feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="hero__feature-text">
              <h3>Excelência</h3>
              <p>em Serviços</p>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel"></div>
        </div>
        <span>Role para explorar</span>
      </div>
    </section>
  )
}

export default Hero

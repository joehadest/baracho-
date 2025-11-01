import React from 'react'
import './Services.css'

const Services = () => {
  const services = [
    {
      title: 'Isolamento Térmico',
      description: 'Isolamento térmico para permutadores industriais com materiais de alta qualidade.',
      image: '/images/services/isolamento termico/isolamento térmico .png',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.07 4.93L16.24 7.76M7.76 16.24L4.93 19.07M19.07 19.07L16.24 16.24M7.76 7.76L4.93 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      title: 'Isolamento Acústico',
      description: 'Soluções eficientes para controle e redução de ruídos em ambientes industriais.',
      image: '/images/services/isolamento termico/isolamento termico duto de ventilação .png',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15.54 8.46C16.4774 9.39764 17.004 10.6692 17.004 11.995C17.004 13.3208 16.4774 14.5924 15.54 15.53M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: 'Proteção Passiva',
      description: 'Proteção contra incêndio e sistemas de segurança para estruturas industriais.',
      image: '/images/services/isolamento termico/isolamento termico em vaso de pressao .png',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: 'Alpinismo Industrial',
      description: 'Trabalhos em altura com segurança e técnicas especializadas de alpinismo.',
      image: '/images/services/alphinismo industrial/alpinismo industrial.png',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path d="M17 21V13H7V21M7 13L12 8L17 13M5 21H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 6C9 7.657 10.343 9 12 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      title: 'Pintura Industrial',
      description: 'Acabamentos e pinturas especiais para estruturas metálicas e equipamentos.',
      image: '/images/services/alphinismo industrial/alpinismo tratamento anticorrosivo e pintura com alpinismo .png',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path d="M14.5 2L20 7.5L7.5 20H2V14.5L14.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 3L19 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: 'Solda e Caldeira',
      description: 'Serviços especializados em solda de alta qualidade e manutenção de caldeiras.',
      image: '/images/services/alphinismo industrial/Limpeza de tanques alpinismo.png',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 2V8H20M12 18V12M9 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ]

  return (
    <section id="services" className="services section">
      <div className="container">
        <h2 className="section-title">Nossos Serviços</h2>
        <p className="section-subtitle">
          Veja alguns serviços em destaque
        </p>

        <div className="services__grid">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div 
                className="service-card__background" 
                style={{ backgroundImage: `url(${service.image})` }}
              ></div>
              <div className="service-card__overlay"></div>
              <div className="service-card__content">
                <div className="service-card__icon">
                  {service.icon}
                </div>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__description">{service.description}</p>
                <div className="service-card__arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

import React from 'react'
import './About.css'

const About = () => {
  const values = [
    {
      title: 'Amar a Deus acima de tudo',
      icon: '✝️'
    },
    {
      title: 'Excelência em produtos e serviços',
      icon: '⭐'
    },
    {
      title: 'Inovação constante',
      icon: '💡'
    },
    {
      title: 'Sustentabilidade e economia de energia',
      icon: '🌱'
    },
    {
      title: 'Segurança como prioridade',
      icon: '🛡️'
    },
    {
      title: 'Integridade e ética nas relações',
      icon: '🤝'
    },
    {
      title: 'Responsabilidade social',
      icon: '❤️'
    }
  ]

  return (
    <section id="about" className="about section">
      <div className="container">
        <h2 className="section-title">Sobre Nossa Empresa</h2>
        <p className="section-subtitle">
          Conheça nossa história e valores
        </p>

        <div className="about__content">
          <div className="about__card about__card--primary">
            <div className="about__card-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="about__card-title">Nossa História</h3>
            <p className="about__card-text">
              Desde 2013, a Baracho Soluções e Serviços tem sido referência em serviços industriais, 
              construindo um legado de confiança e excelência.
            </p>
          </div>

          <div className="about__card about__card--secondary">
            <div className="about__card-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="about__card-title">Nossa Missão</h3>
            <p className="about__card-text">
              Ser líder nacional em serviços industriais, com foco em excelência, eficiência 
              e proteção ambiental.
            </p>
          </div>

          <div className="about__card about__card--tertiary">
            <div className="about__card-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3 className="about__card-title">Nossa Visão</h3>
            <p className="about__card-text">
              Ser referência em qualidade, inovação e sustentabilidade no setor industrial.
            </p>
          </div>
        </div>

        <div className="about__values">
          <h3 className="about__values-title">Nossos Valores</h3>
          <div className="about__values-grid">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="about__value"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="about__value-icon">{value.icon}</span>
                <span className="about__value-text">{value.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

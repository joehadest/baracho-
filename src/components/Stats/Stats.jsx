import React, { useState, useEffect, useRef } from 'react'
import './Stats.css'

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false)
  const statsRef = useRef(null)

  const stats = [
    {
      value: 12,
      suffix: '+',
      label: 'Anos de Experiência',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path d="M12 8V12L15 15M21 12C21 16.971 16.971 21 12 21C7.029 21 3 16.971 3 12C3 7.029 7.029 3 12 3C16.971 3 21 7.029 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      value: 100,
      suffix: '+',
      label: 'Projetos Concluídos',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path d="M9 11L12 14L22 4M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      value: 100,
      suffix: '+',
      label: 'Clientes Satisfeitos',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current)
      }
    }
  }, [])

  const Counter = ({ value, suffix, isVisible }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (!isVisible) return

      let start = 0
      const end = value
      const duration = 2000
      const increment = end / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(timer)
    }, [isVisible, value])

    return (
      <span>
        {count}
        {suffix}
      </span>
    )
  }

  return (
    <section className="stats" ref={statsRef}>
      <div className="stats__overlay"></div>
      <div className="container">
        <div className="stats__grid">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="stat-card"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="stat-card__icon">
                {stat.icon}
              </div>
              <div className="stat-card__content">
                <div className="stat-card__value">
                  <Counter value={stat.value} suffix={stat.suffix} isVisible={isVisible} />
                </div>
                <div className="stat-card__label">{stat.label}</div>
              </div>
              <div className="stat-card__glow"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats

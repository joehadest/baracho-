import React, { useState } from 'react'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Criar mensagem para WhatsApp
    const whatsappNumber = '5584999263052' // Formato internacional: 55 (Brasil) + 84 (DDD) + número
    const message = `*Solicitação de Orçamento*%0A%0A*Nome:* ${formData.name}%0A*Telefone:* ${formData.phone}%0A*E-mail:* ${formData.email}%0A*Serviço:* ${formData.service}%0A*Mensagem:* ${formData.message}`
    
    // Abrir WhatsApp com a mensagem
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
    
    // Limpar formulário
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    })
  }

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <h2 className="section-title">Entre em Contato</h2>
        <p className="section-subtitle">
          Solicite um orçamento sem compromisso
        </p>

        <div className="contact__content">
          <div className="contact__info">
            <div className="contact__info-card">
              <div className="contact__info-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3>Localização</h3>
                <p>Atendemos todo Brasil</p>
              </div>
            </div>

            <div className="contact__info-card">
              <div className="contact__info-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.17997C2.095 3.90344 2.12787 3.62474 2.21649 3.3616C2.30512 3.09846 2.44756 2.85666 2.63476 2.6516C2.82196 2.44653 3.0498 2.28268 3.30379 2.17052C3.55777 2.05837 3.83233 2.00026 4.10999 1.99997H7.10999C7.5953 1.9952 8.06579 2.16705 8.43376 2.48351C8.80173 2.79996 9.04207 3.23942 9.10999 3.71997C9.23662 4.68004 9.47144 5.6227 9.80999 6.52997C9.94454 6.8879 9.97366 7.27689 9.8939 7.65086C9.81415 8.02482 9.62886 8.36809 9.35999 8.63998L8.08999 9.90997C9.51355 12.4135 11.5864 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0554 17.47 14.19C18.3773 14.5285 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3>Telefone</h3>
                <p>(84) 9 9926-3052</p>
                <p>(84) 9 9907-4059</p>
              </div>
            </div>

            <div className="contact__info-card">
              <div className="contact__info-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3>E-mail</h3>
                <p>comercial@barachorn.com</p>
              </div>
            </div>

            <div className="contact__info-card">
              <div className="contact__info-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3>Desde</h3>
                <p>22/02/2013</p>
              </div>
            </div>

            <div className="contact__info-card">
              <div className="contact__info-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3>Responsável</h3>
                <p>Assis Baracho</p>
              </div>
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__form-group">
              <label htmlFor="name">Nome Completo *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Digite seu nome"
              />
            </div>

            <div className="contact__form-row">
              <div className="contact__form-group">
                <label htmlFor="email">E-mail *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="seu@email.com"
                />
              </div>

              <div className="contact__form-group">
                <label htmlFor="phone">Telefone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="(XX) XXXXX-XXXX"
                />
              </div>
            </div>

            <div className="contact__form-group">
              <label htmlFor="service">Serviço de Interesse *</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="">Selecione um serviço</option>
                <option value="isolamento-termico">Isolamento Térmico</option>
                <option value="isolamento-acustico">Isolamento Acústico</option>
                <option value="protecao-passiva">Proteção Passiva</option>
                <option value="alpinismo">Alpinismo Industrial</option>
                <option value="pintura">Pintura Industrial</option>
                <option value="solda">Solda e Caldeira</option>
              </select>
            </div>

            <div className="contact__form-group">
              <label htmlFor="message">Mensagem *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Descreva seu projeto..."
              ></textarea>
            </div>

            <button type="submit" className="contact__form-submit">
              <span>Enviar Orçamento</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact

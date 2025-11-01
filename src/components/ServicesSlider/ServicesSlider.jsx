import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './ServicesSlider.css'

const ServicesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  // Imagens dos serviços organizadas por categoria
  const servicesImages = [
    // Alpinismo Industrial
    {
      image: '/images/services/alphinismo industrial/alpinismo industrial.png',
      title: 'Alpinismo Industrial',
      category: 'Alpinismo'
    },
    {
      image: '/images/services/alphinismo industrial/alpinismo tratamento anticorrosivo e pintura com alpinismo .png',
      title: 'Tratamento Anticorrosivo com Alpinismo',
      category: 'Alpinismo'
    },
    {
      image: '/images/services/alphinismo industrial/Limpeza de tanques alpinismo.png',
      title: 'Limpeza de Tanques',
      category: 'Alpinismo'
    },
    // Isolamento Térmico
    {
      image: '/images/services/isolamento termico/isolamento térmico .png',
      title: 'Isolamento Térmico',
      category: 'Isolamento Térmico'
    },
    {
      image: '/images/services/isolamento termico/isolamento termico em equipamento e tubulações.png',
      title: 'Isolamento em Equipamentos e Tubulações',
      category: 'Isolamento Térmico'
    },
    {
      image: '/images/services/isolamento termico/isolamento termico duto de ventilação .png',
      title: 'Isolamento em Dutos de Ventilação',
      category: 'Isolamento Térmico'
    },
    {
      image: '/images/services/isolamento termico/isolamento termico em vaso de pressao .png',
      title: 'Isolamento em Vasos de Pressão',
      category: 'Isolamento Térmico'
    },
    {
      image: '/images/services/isolamento termico/isolamento termico linha de vapor santana textiles.png',
      title: 'Isolamento em Linha de Vapor',
      category: 'Isolamento Térmico'
    },
    {
      image: '/images/services/isolamento termico/isolamento termico tanque de maracanã em andamento .png',
      title: 'Isolamento em Tanques',
      category: 'Isolamento Térmico'
    },
    {
      image: '/images/services/isolamento termico/isolamento termico linha de vapor.png',
      title: 'Isolamento de Linha de Vapor',
      category: 'Isolamento Térmico'
    },
    {
      image: '/images/services/isolamento termico/Isolamento Térmico da turbina.png',
      title: 'Isolamento Térmico de Turbina',
      category: 'Isolamento Térmico'
    }
  ]

  // Animação de entrada ao scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.querySelector('.services-slider')
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  // Auto-play do slider
  useEffect(() => {
    if (!isAutoPlaying || isModalOpen) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === servicesImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 4000) // Muda a cada 4 segundos

    return () => clearInterval(interval)
  }, [isAutoPlaying, isModalOpen, servicesImages.length])

    // Controle de teclado para o modal
  useEffect(() => {
    if (!isModalOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal()
      } else if (e.key === 'ArrowLeft') {
        prevImage()
      } else if (e.key === 'ArrowRight') {
        nextImage()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, selectedImage])

  // Prevenir scroll do body quando o modal estiver aberto
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  const openModal = (service) => {
    setSelectedImage(service)
    setIsModalOpen(true)
    setIsAutoPlaying(false)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
    setTimeout(() => setIsAutoPlaying(true), 1000)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Retoma auto-play após 10s
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === servicesImages.length - 1 ? 0 : prevIndex + 1
    )
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? servicesImages.length - 1 : prevIndex - 1
    )
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextImage = () => {
    const currentIdx = servicesImages.findIndex(img => img.image === selectedImage.image)
    const nextIdx = (currentIdx + 1) % servicesImages.length
    setSelectedImage(servicesImages[nextIdx])
  }

  const prevImage = () => {
    const currentIdx = servicesImages.findIndex(img => img.image === selectedImage.image)
    const prevIdx = currentIdx === 0 ? servicesImages.length - 1 : currentIdx - 1
    setSelectedImage(servicesImages[prevIdx])
  }

  // Calcular slides visíveis (3 por vez em desktop)
  const getVisibleSlides = () => {
    const slides = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % servicesImages.length
      slides.push({ ...servicesImages[index], slideIndex: i })
    }
    return slides
  }

  return (
    <section className={`services-slider ${isVisible ? 'services-slider--visible' : ''}`}>
      <div className="container">
        <div className="services-slider__header">
          <h2 className="services-slider__title">Nossos Serviços em Destaque</h2>
          <p className="services-slider__subtitle">
            Confira alguns dos nossos trabalhos realizados
          </p>
        </div>

        <div className="services-slider__container">
          <button 
            className="services-slider__nav services-slider__nav--prev"
            onClick={prevSlide}
            aria-label="Anterior"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="services-slider__track">
            {getVisibleSlides().map((service, index) => (
              <div 
                key={index}
                className="services-slider__slide"
                style={{ animationDelay: `${service.slideIndex * 0.1}s` }}
              >
                <div 
                  className="services-slider__image-wrapper"
                  onClick={() => openModal(service)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && openModal(service)}
                >
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="services-slider__image"
                  />
                  <div className="services-slider__overlay">
                    <span className="services-slider__category">{service.category}</span>
                    <h3 className="services-slider__slide-title">{service.title}</h3>
                    <div className="services-slider__zoom-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                        <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M11 8V14M8 11H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            className="services-slider__nav services-slider__nav--next"
            onClick={nextSlide}
            aria-label="Próximo"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="services-slider__dots">
          {servicesImages.map((_, index) => (
            <button
              key={index}
              className={`services-slider__dot ${index === currentIndex ? 'services-slider__dot--active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Modal para visualização de imagem em tamanho completo */}
      {isModalOpen && selectedImage && createPortal(
        <div 
          className="services-slider__modal"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <button 
            className="services-slider__modal-close"
            onClick={closeModal}
            aria-label="Fechar modal"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button 
            className="services-slider__modal-nav services-slider__modal-nav--prev"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            aria-label="Imagem anterior"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div 
            className="services-slider__modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage.image} 
              alt={selectedImage.title}
              className="services-slider__modal-image"
            />
            <div className="services-slider__modal-info">
              <span className="services-slider__modal-category">{selectedImage.category}</span>
              <h3 className="services-slider__modal-title">{selectedImage.title}</h3>
            </div>
          </div>

          <button 
            className="services-slider__modal-nav services-slider__modal-nav--next"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            aria-label="Próxima imagem"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>,
        document.body
      )}
    </section>
  )
}

export default ServicesSlider

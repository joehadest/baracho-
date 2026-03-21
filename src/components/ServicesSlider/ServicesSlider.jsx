import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { barachoProjects } from '../../data/barachoProjects'
import './ServicesSlider.css'

const featuredProjects = barachoProjects

const ServicesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

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

  useEffect(() => {
    if (!isAutoPlaying || isModalOpen) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === featuredProjects.length - 1 ? 0 : prevIndex + 1
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, isModalOpen])

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

  const openModal = (project) => {
    setSelectedImage(project)
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
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === featuredProjects.length - 1 ? 0 : prevIndex + 1
    )
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredProjects.length - 1 : prevIndex - 1
    )
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextImage = () => {
    const currentIdx = featuredProjects.findIndex((p) => p.image === selectedImage.image)
    const nextIdx = (currentIdx + 1) % featuredProjects.length
    setSelectedImage(featuredProjects[nextIdx])
  }

  const prevImage = () => {
    const currentIdx = featuredProjects.findIndex((p) => p.image === selectedImage.image)
    const prevIdx = currentIdx === 0 ? featuredProjects.length - 1 : currentIdx - 1
    setSelectedImage(featuredProjects[prevIdx])
  }

  const getVisibleSlides = () => {
    const slides = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % featuredProjects.length
      slides.push({ ...featuredProjects[index], slideIndex: i })
    }
    return slides
  }

  const categoryDisplay = (project) => project.categoryLabel || project.category

  return (
    <section className={`services-slider ${isVisible ? 'services-slider--visible' : ''}`}>
      <div className="container">
        <div className="services-slider__header">
          <h2 className="services-slider__title">Nossos Projetos em Destaque</h2>
          <p className="services-slider__subtitle">
            Seleção dos nossos trabalhos recentes — confira a galeria completa na seção Projetos
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
            {getVisibleSlides().map((project) => (
              <div
                key={`${project.image}-${project.slideIndex}`}
                className="services-slider__slide"
                style={{ animationDelay: `${project.slideIndex * 0.1}s` }}
              >
                <div
                  className="services-slider__image-wrapper"
                  onClick={() => openModal(project)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && openModal(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="services-slider__image"
                  />
                  <div className="services-slider__overlay">
                    <span className="services-slider__category">{categoryDisplay(project)}</span>
                    <h3 className="services-slider__slide-title">{project.title}</h3>
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
          {featuredProjects.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`services-slider__dot ${index === currentIndex ? 'services-slider__dot--active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

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
              <span className="services-slider__modal-category">{categoryDisplay(selectedImage)}</span>
              <h3 className="services-slider__modal-title">{selectedImage.title}</h3>
              {selectedImage.description && (
                <p className="services-slider__modal-description">{selectedImage.description}</p>
              )}
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

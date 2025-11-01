import React, { useState, useEffect } from 'react'
import './Projects.css'

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    {
      title: 'Alpinismo Industrial 1',
      category: 'alpinismo',
      description: 'Trabalho de alpinismo industrial com segurança e precisão.',
      image: '/images/projects/alphinismo/alphinismo 1.jpg'
    },
    {
      title: 'Alpinismo Industrial 2',
      category: 'alpinismo',
      description: 'Instalação e manutenção em altura com técnicas especializadas.',
      image: '/images/projects/alphinismo/alphinismo 2.jpg'
    },
    {
      title: 'Pintura Industrial 1',
      category: 'pintura',
      description: 'Acabamento de pintura em estruturas industriais.',
      image: '/images/projects/pintura industrial/pintura industrial 1.jpg'
    },
    {
      title: 'Pintura Industrial 2',
      category: 'pintura',
      description: 'Pintura especializada em equipamentos industriais.',
      image: '/images/projects/pintura industrial/pintura industrial 2.jpg'
    },
    {
      title: 'Serviço de Solda e Caldeira 1',
      category: 'solda',
      description: 'Serviços especializados em solda de alta qualidade.',
      image: '/images/projects/solda e caldeira/serviço de solda e caldeira.jpg'
    },
    {
      title: 'Serviço de Solda e Caldeira 2',
      category: 'solda',
      description: 'Manutenção e reparo de caldeiras industriais.',
      image: '/images/projects/solda e caldeira/serviço de solda e caldeira 2.jpg'
    }
  ]

  const filters = [
    { id: 'all', label: 'Todos' },
    { id: 'alpinismo', label: 'Alpinismo' },
    { id: 'pintura', label: 'Pintura' },
    { id: 'solda', label: 'Solda' }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  // Funções do modal
  const openModal = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  const nextProject = () => {
    const currentIdx = filteredProjects.findIndex(p => p.image === selectedProject.image)
    const nextIdx = (currentIdx + 1) % filteredProjects.length
    setSelectedProject(filteredProjects[nextIdx])
  }

  const prevProject = () => {
    const currentIdx = filteredProjects.findIndex(p => p.image === selectedProject.image)
    const prevIdx = currentIdx === 0 ? filteredProjects.length - 1 : currentIdx - 1
    setSelectedProject(filteredProjects[prevIdx])
  }

  // Controle de teclado
  useEffect(() => {
    if (!isModalOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal()
      } else if (e.key === 'ArrowLeft') {
        prevProject()
      } else if (e.key === 'ArrowRight') {
        nextProject()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, selectedProject, filteredProjects])

  // Prevenir scroll do body quando modal aberto
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

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <h2 className="section-title">Nossos Projetos</h2>
        <p className="section-subtitle">
          Alguns dos nossos projetos mais recentes
        </p>

        <div className="projects__filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`projects__filter-btn ${activeFilter === filter.id ? 'projects__filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="projects__grid">
          {filteredProjects.map((project, index) => (
            <div 
              key={index} 
              className="project-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div 
                className="project-card__image"
                onClick={() => openModal(project)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && openModal(project)}
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="project-card__photo"
                />
                <div className="project-card__overlay">
                  <div className="project-card__zoom-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                      <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M11 8V14M8 11H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <button className="project-card__btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 11L12 14M12 14L9 11M12 14V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Ver Projeto
                  </button>
                </div>
              </div>
              <div className="project-card__content">
                <span className="project-card__category">{project.category}</span>
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__description">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para visualização do projeto em tamanho completo */}
      {isModalOpen && selectedProject && (
        <div 
          className="projects__modal"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <button 
            className="projects__modal-close"
            onClick={closeModal}
            aria-label="Fechar modal"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button 
            className="projects__modal-nav projects__modal-nav--prev"
            onClick={(e) => { e.stopPropagation(); prevProject(); }}
            aria-label="Projeto anterior"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div 
            className="projects__modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedProject.image} 
              alt={selectedProject.title}
              className="projects__modal-image"
            />
            <div className="projects__modal-info">
              <span className="projects__modal-category">{selectedProject.category}</span>
              <h3 className="projects__modal-title">{selectedProject.title}</h3>
              <p className="projects__modal-description">{selectedProject.description}</p>
            </div>
          </div>

          <button 
            className="projects__modal-nav projects__modal-nav--next"
            onClick={(e) => { e.stopPropagation(); nextProject(); }}
            aria-label="Próximo projeto"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}

export default Projects

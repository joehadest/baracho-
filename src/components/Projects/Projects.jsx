import { useMemo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { gsap, MQ, ScrollTrigger, primeTransforms, useGSAP, viewTransition } from '../../lib/motion'
import { allProjects, categoryLabel, projectFilters } from '../../data/projects'
import SectionHeading from '../ui/SectionHeading'
import { responsive, SIZES } from '../../lib/images'
import Lightbox from '../ui/Lightbox'

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const root = useRef(null)

  const counts = useMemo(() => {
    const map = { all: allProjects.length }
    allProjects.forEach((p) => (map[p.category] = (map[p.category] || 0) + 1))
    return map
  }, [])

  const filters = projectFilters.filter((f) => counts[f.id])

  const filtered = useMemo(
    () => (activeFilter === 'all' ? allProjects : allProjects.filter((p) => p.category === activeFilter)),
    [activeFilter]
  )

  // Cards entram em lotes conforme aparecem na tela
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        primeTransforms(root.current, '[data-project]')
        gsap.set('[data-project]', { autoAlpha: 0, y: 70 })
        const triggers = ScrollTrigger.batch('[data-project]', {
          start: 'top 92%',
          once: true,
          onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.08, overwrite: true }),
        })
        return () => triggers.forEach((t) => t.kill())
      })
    },
    { scope: root }
  )

  // Filtro com View Transitions: cada card "desliza" para sua nova posição
  const changeFilter = (id) => {
    if (id === activeFilter) return
    const update = () => {
      flushSync(() => setActiveFilter(id))
      gsap.set('[data-project]', { autoAlpha: 1, y: 0 })
    }
    const vt = viewTransition(update)
    if (vt) vt.finished.then(() => ScrollTrigger.refresh())
    else ScrollTrigger.refresh()
  }

  const open = (index, e) => {
    const img = e.currentTarget.querySelector('img')
    img.style.viewTransitionName = 'lightbox-img'
    viewTransition(() => {
      img.style.viewTransitionName = ''
      flushSync(() => setSelected(index))
    })
  }

  return (
    <section ref={root} id="projects" className="relative scroll-mt-20 border-t border-line bg-ink-900 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading index="03" eyebrow="Portfólio" title={<>Nossos <span className="text-brand-500">projetos</span></>}>
          Obras e serviços executados em plataformas, indústrias e edificações. Filtre por especialidade e
          clique para ampliar.
        </SectionHeading>

        {/* Filtros */}
        <div className="reveal no-scrollbar -mx-4 mt-12 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" role="toolbar" aria-label="Filtrar projetos">
          {filters.map((filter) => {
            const active = activeFilter === filter.id
            return (
              <button
                key={filter.id}
                onClick={() => changeFilter(filter.id)}
                aria-pressed={active}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  active
                    ? 'border-brand-500 bg-brand-500 text-white'
                    : 'border-line-strong text-zinc-400 hover:border-white/40 hover:text-white'
                }`}
              >
                {filter.label}
                <span className={`font-mono text-[0.7rem] ${active ? 'text-white/70' : 'text-zinc-600'}`}>{counts[filter.id]}</span>
              </button>
            )
          })}
        </div>

        {/* Galeria */}
        <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((project, index) => (
            <button
              key={project.image}
              data-project
              data-cursor="Ver"
              onClick={(e) => open(index, e)}
              className="group flex flex-col self-start text-left"
              style={{ viewTransitionName: `project-${allProjects.indexOf(project)}` }}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink-850 ring-1 ring-line transition duration-500 group-hover:ring-brand-500/60">
                <img
                  {...responsive(project.image, SIZES.grid)}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-700 ease-(--ease-out-expo) group-hover:scale-105"
                />
                <span className="absolute top-3 right-3 grid size-10 scale-75 place-items-center rounded-full bg-brand-500 text-white opacity-0 shadow-lg transition duration-500 group-hover:scale-100 group-hover:opacity-100">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <div className="mt-3 sm:mt-4">
                <span className="font-mono text-[0.6rem] tracking-[0.18em] text-brand-400 uppercase sm:text-[0.68rem]">
                  {categoryLabel(project)}
                </span>
                <h3 className="font-display text-lg leading-tight font-bold text-white uppercase transition-colors group-hover:text-brand-400 sm:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-1 line-clamp-2 hidden text-sm text-zinc-400 sm:block">{project.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Lightbox items={filtered} index={selected} onClose={() => setSelected(null)} onChange={setSelected} />
    </section>
  )
}

export default Projects

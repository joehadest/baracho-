import { useCallback, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { barachoProjects } from '../../data/barachoProjects'
import { categoryLabel } from '../../data/projects'
import { gsap, MQ, useGSAP, viewTransition } from '../../lib/motion'
import SectionHeading from '../ui/SectionHeading'
import Lightbox from '../ui/Lightbox'

const items = barachoProjects
const pad = (n) => String(n).padStart(2, '0')

const ArrowButton = ({ dir, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={dir === 'prev' ? 'Projetos anteriores' : 'Próximos projetos'}
    className="grid size-12 place-items-center rounded-full border border-line-strong text-white transition hover:border-brand-500 hover:bg-brand-500 disabled:pointer-events-none disabled:opacity-30"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={dir === 'prev' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </button>
)

/**
 * Desktop: a seção fica fixada e o scroll vertical move a faixa na horizontal,
 * com parallax interno em cada foto.
 * Mobile/tablet: carrossel nativo com scroll-snap + setas.
 */
const Featured = () => {
  const root = useRef(null)
  const trackRef = useRef(null)
  const barRef = useRef(null)
  const currentRef = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: false })
  const [selected, setSelected] = useState(null)

  const paint = useCallback((progress) => {
    if (barRef.current) barRef.current.style.transform = `scaleX(${Math.max(0.06, progress)})`
    if (currentRef.current) currentRef.current.textContent = pad(Math.round(progress * (items.length - 1)) + 1)
  }, [])

  const onNativeScroll = () => {
    const el = trackRef.current
    if (!el || el.scrollWidth <= el.clientWidth) return
    const max = el.scrollWidth - el.clientWidth
    const p = el.scrollLeft / max
    paint(p)
    const next = { start: p <= 0.001, end: p >= 0.999 }
    if (next.start !== edges.start || next.end !== edges.end) setEdges(next)
  }

  const scroll = (dir) => {
    const el = trackRef.current
    el?.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' })
  }

  useGSAP(
    () => {
      paint(0)
      const mm = gsap.matchMedia()

      mm.add(MQ.desktop, () => {
        const track = trackRef.current
        const distance = () => {
          const last = track.lastElementChild
          const padLeft = parseFloat(getComputedStyle(track).paddingLeft)
          return last.offsetLeft + last.offsetWidth + padLeft - track.clientWidth
        }

        const slide = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance() * 0.75}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => paint(self.progress),
          },
        })

        // Parallax dentro de cada card, guiado pelo movimento horizontal
        gsap.utils.toArray('[data-feat-img]', track).forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -9 },
            {
              xPercent: 9,
              ease: 'none',
              scrollTrigger: { trigger: img.parentElement, containerAnimation: slide, start: 'left right', end: 'right left', scrub: true },
            }
          )
        })

        // Os cards entram em cascata na primeira vez
        gsap.from('[data-feat-card]', {
          yPercent: 30,
          autoAlpha: 0,
          stagger: 0.07,
          duration: 1.3,
          scrollTrigger: { trigger: root.current, start: 'top 70%', once: true },
        })
      })

      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-feat-card]', {
          x: 80,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1.2,
          scrollTrigger: { trigger: trackRef.current, start: 'top 85%', once: true },
        })
      })
    },
    { scope: root }
  )

  const open = (index, e) => {
    const img = e.currentTarget.querySelector('img')
    if (img) img.style.viewTransitionName = 'lightbox-img'
    viewTransition(() => {
      if (img) img.style.viewTransitionName = ''
      flushSync(() => setSelected(index))
    })
  }

  return (
    <section ref={root} className="relative overflow-hidden bg-ink-950 py-24 sm:py-32 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-0">
      <div className="container-x lg:pt-20">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading eyebrow="Em destaque" title={<>Projetos <span className="text-brand-500">recentes</span></>}>
            Uma seleção dos nossos trabalhos mais recentes. Clique em um projeto para ampliar — a galeria completa está na
            seção Projetos.
          </SectionHeading>
          <div className="flex gap-3 lg:hidden">
            <ArrowButton dir="prev" onClick={() => scroll(-1)} disabled={edges.start} />
            <ArrowButton dir="next" onClick={() => scroll(1)} disabled={edges.end} />
          </div>
          <p className="hidden items-center gap-3 font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase lg:flex">
            Role para explorar
            <svg width="28" height="12" viewBox="0 0 28 12" fill="none" aria-hidden="true" className="animate-nudge text-brand-500">
              <path d="M0 6h26m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </p>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={onNativeScroll}
        className="no-scrollbar relative mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 sm:scroll-px-6 sm:gap-6 sm:px-6 lg:mt-10 lg:snap-none lg:overflow-visible lg:px-[max(2.5rem,calc((100vw-88rem)/2+2.5rem))] lg:pb-0"
      >
        {items.map((project, index) => (
          <button
            key={project.image}
            data-feat-card
            data-cursor="Ver"
            onClick={(e) => open(index, e)}
            className="group flex w-[72%] shrink-0 flex-col self-start snap-start text-left sm:w-[40%] lg:w-auto"
          >
            <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-ink-850 ring-1 ring-line transition duration-500 group-hover:ring-brand-500/60 lg:h-[54svh]">
              <img
                data-feat-img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="h-full w-full scale-[1.22] object-cover transition-[scale] duration-700 ease-(--ease-out-expo) group-hover:scale-[1.3]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
            </div>
            <div className="mt-4 flex items-start gap-3">
              <span className="pt-1 font-mono text-xs text-zinc-500">{pad(index + 1)}</span>
              <div>
                <h3 className="font-display text-2xl leading-tight font-bold text-white uppercase transition-colors group-hover:text-brand-400">
                  {project.title}
                </h3>
                <span className="font-mono text-[0.68rem] tracking-[0.18em] text-zinc-500 uppercase">{categoryLabel(project)}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="container-x mt-8 lg:mt-10">
        <div className="flex items-center gap-4 font-mono text-xs text-zinc-500">
          <span ref={currentRef} className="w-5 text-white tabular-nums">01</span>
          <div className="relative h-px flex-1 bg-line-strong">
            <div ref={barRef} className="absolute inset-0 origin-left bg-brand-500" style={{ transform: 'scaleX(0.06)' }} />
          </div>
          <span>{pad(items.length)}</span>
        </div>
      </div>

      <Lightbox items={items} index={selected} onClose={() => setSelected(null)} onChange={setSelected} />
    </section>
  )
}

export default Featured

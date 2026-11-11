import { useRef } from 'react'
import { gsap, MQ, SplitText, primeTransforms, useGSAP } from '../../lib/motion'
import RopeAccessArt from './RopeAccessArt'

const statement =
  'Há mais de 12 anos executamos isolamento, proteção passiva, alpinismo e pintura industrial com rigor técnico. Em campo, segurança e excelência não são diferenciais — são o nosso padrão.'

const highlights = ['segurança', 'excelência', 'padrão.']

/**
 * 1) Manifesto: as palavras "acendem" uma a uma conforme o scroll (scrub).
 * 2) Zoom: a foto fixa no centro cresce de um recorte até ocupar a tela inteira.
 */
const Manifesto = () => {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MQ.motion, () => {
        // --- Palavras acendendo
        const split = SplitText.create('[data-manifesto]', { type: 'words', wordsClass: 'mf-word' })
        primeTransforms(root.current, '[data-zoom-img], [data-climber], [data-annot], [data-zoom-word], [data-zoom-caption] > *')
        gsap.fromTo(
          split.words,
          { opacity: 0.12 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.1,
            scrollTrigger: { trigger: '[data-manifesto]', start: 'top 80%', end: 'bottom 45%', scrub: true },
          }
        )

        // --- Zoom fixado
        const zoom = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: '[data-zoom]',
            start: 'top top',
            end: '+=180%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        })
        const startClip = () =>
          window.innerWidth < 768 ? 'inset(25% 6% 25% 6% round 24px)' : 'inset(25% 27% 25% 27% round 32px)'
        zoom
          .fromTo('[data-zoom-frame]', { clipPath: startClip }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1 })
          .fromTo('[data-zoom-img]', { scale: 1.3 }, { scale: 1, duration: 1 }, 0)
          .fromTo('[data-climber]', { y: -40 }, { y: 60, stagger: 0.06, duration: 1.1 }, 0)
          .fromTo('[data-annot]', { y: -40, autoAlpha: 0 }, { y: 60, autoAlpha: 1, duration: 1.1 }, 0.18)
          .to('[data-zoom-word="l"]', { yPercent: -80, xPercent: -15, autoAlpha: 0, duration: 0.7 }, 0)
          .to('[data-zoom-word="r"]', { yPercent: 80, xPercent: 15, autoAlpha: 0, duration: 0.7 }, 0)
          .from('[data-zoom-caption] > *', { autoAlpha: 0, y: 50, stagger: 0.08, duration: 0.35 }, 0.75)
          .to({}, { duration: 0.25 })

        return () => split.revert()
      })
    },
    { scope: root }
  )

  return (
    <div ref={root}>
      {/* Manifesto */}
      <section className="relative py-28 sm:py-40" aria-label="Manifesto">
        <div className="container-x">
          <p className="eyebrow">Manifesto</p>
          <p
            data-manifesto
            className="mt-10 max-w-6xl font-display text-[clamp(2.1rem,5.2vw,5rem)] leading-[1.02] font-bold tracking-tight text-white uppercase"
          >
            {statement.split(' ').map((word, i) => (
              <span key={i} className={highlights.includes(word.toLowerCase()) ? 'text-brand-500' : undefined}>
                {word}{' '}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* Zoom fixado */}
      <section data-zoom className="relative h-svh overflow-hidden bg-ink-950" aria-label="Alpinismo industrial">
        <div
          className="absolute inset-0 flex flex-col justify-between px-4 py-[6svh] font-display text-[clamp(3.5rem,21vw,9rem)] leading-[0.8] font-extrabold tracking-tight uppercase sm:px-8 md:py-[3svh] md:text-[min(13vw,19svh)]"
          aria-hidden="true"
        >
          <span data-zoom-word="l" className="text-outline self-start">Acesso</span>
          <span data-zoom-word="r" className="self-end text-brand-500">Altura</span>
        </div>

        <div data-zoom-frame className="absolute inset-0 overflow-hidden">
          <RopeAccessArt data-zoom-img className="h-full w-full origin-[55%_50%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
        </div>

        <div data-zoom-caption className="container-x absolute inset-x-0 bottom-0 pb-14 sm:pb-20">
          <p className="eyebrow">Alpinismo industrial</p>
          <h2 className="mt-4 max-w-4xl font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.9] font-extrabold text-white uppercase">
            Do chão ao topo, com <span className="text-brand-500">segurança</span>.
          </h2>
          <p className="mt-5 max-w-xl text-lg text-zinc-300">
            Inspeção, limpeza, pintura e isolamento em altura com técnica e total segurança.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Manifesto

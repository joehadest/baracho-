import { useRef } from 'react'
import { gsap, MQ, SplitText, useGSAP } from '../../lib/motion'

/**
 * Título de seção com revelação linha a linha (SplitText com máscara),
 * disparada quando entra na tela.
 */
const SectionHeading = ({ index, eyebrow, title, children, align = 'left', className = '' }) => {
  const centered = align === 'center'
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        const trigger = { trigger: root.current, start: 'top 85%', once: true }

        gsap.from('[data-sh-eyebrow]', { autoAlpha: 0, x: -24, duration: 1, scrollTrigger: trigger })
        gsap.from('[data-sh-text]', { autoAlpha: 0, y: 24, duration: 1.2, delay: 0.35, scrollTrigger: trigger })

        const split = SplitText.create('[data-sh-title]', {
          type: 'lines',
          mask: 'lines',
          linesClass: 'split-line',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.3,
              stagger: 0.1,
              scrollTrigger: trigger,
            }),
        })
        return () => split.revert()
      })
    },
    { scope: root }
  )

  return (
    <div ref={root} className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}>
      <span data-sh-eyebrow className="eyebrow">
        {index && <span className="text-zinc-500">{index}</span>}
        {eyebrow}
      </span>
      <h2 data-sh-title className="heading-xl mt-5 text-white">
        {title}
      </h2>
      {children && (
        <p data-sh-text className={`mt-6 text-lg leading-relaxed text-zinc-400 ${centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>
          {children}
        </p>
      )}
    </div>
  )
}

export default SectionHeading

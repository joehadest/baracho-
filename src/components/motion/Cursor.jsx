import { useEffect, useRef } from 'react'
import { gsap, MQ } from '../../lib/motion'

/**
 * Cursor seguidor (apenas mouse/trackpad) + botões magnéticos.
 *  - [data-cursor="Ver"]  → bolha vermelha com o rótulo
 *  - a, button            → anel se expande
 *  - [data-magnetic]      → elemento é "puxado" na direção do ponteiro
 */
const Cursor = () => {
  const ringRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add(MQ.fine, () => {
      const ring = ringRef.current
      const label = labelRef.current
      document.documentElement.classList.add('has-cursor')

      gsap.set(ring, { xPercent: -50, yPercent: -50, opacity: 0 })
      const xTo = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' })
      const yTo = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' })

      let state = 'default'
      const setState = (next, text = '') => {
        if (next === state && label.textContent === text) return
        state = next
        label.textContent = text
        ring.dataset.state = next
      }

      let magnet = null
      const releaseMagnet = () => {
        if (!magnet) return
        gsap.to(magnet, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)' })
        magnet = null
      }

      const onMove = (e) => {
        xTo(e.clientX)
        yTo(e.clientY)
        gsap.to(ring, { opacity: 1, duration: 0.3, overwrite: 'auto' })

        const t = e.target instanceof Element ? e.target : null
        const labeled = t?.closest('[data-cursor]')
        if (labeled) setState('label', labeled.dataset.cursor)
        else if (t?.closest('a, button, select, [role="button"]')) setState('hover')
        else if (t?.closest('input, textarea')) setState('hidden')
        else setState('default')

        const m = t?.closest('[data-magnetic]')
        if (m !== magnet) releaseMagnet()
        if (m) {
          magnet = m
          const r = m.getBoundingClientRect()
          const strength = Number(m.dataset.magnetic) || 0.35
          gsap.to(m, {
            x: (e.clientX - (r.left + r.width / 2)) * strength,
            y: (e.clientY - (r.top + r.height / 2)) * strength,
            duration: 0.5,
            ease: 'power3',
            overwrite: 'auto',
          })
        }
      }

      const onLeave = () => {
        gsap.to(ring, { opacity: 0, duration: 0.3 })
        releaseMagnet()
      }
      const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.2 })
      const onUp = () => gsap.to(ring, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.4)' })

      window.addEventListener('pointermove', onMove, { passive: true })
      document.documentElement.addEventListener('pointerleave', onLeave)
      window.addEventListener('pointerdown', onDown)
      window.addEventListener('pointerup', onUp)

      return () => {
        document.documentElement.classList.remove('has-cursor')
        window.removeEventListener('pointermove', onMove)
        document.documentElement.removeEventListener('pointerleave', onLeave)
        window.removeEventListener('pointerdown', onDown)
        window.removeEventListener('pointerup', onUp)
        releaseMagnet()
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <div ref={ringRef} className="cursor-ring" data-state="default" aria-hidden="true">
      <span ref={labelRef} className="cursor-label" />
    </div>
  )
}

export default Cursor

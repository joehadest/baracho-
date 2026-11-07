import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)
gsap.defaults({ ease: 'expo.out', duration: 1.1 })

export { gsap, ScrollTrigger, SplitText, useGSAP }

/** Media queries usadas com gsap.matchMedia() */
export const MQ = {
  motion: '(prefers-reduced-motion: no-preference)',
  desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
  fine: '(pointer: fine) and (prefers-reduced-motion: no-preference)',
}

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---------- Smooth scroll (Lenis) ---------- */
let lenis = null
const locks = new Set()
let pending = null // rolagem pedida enquanto o scroll estava travado (ex.: link do menu mobile)

export const setLenis = (instance) => {
  lenis = instance
  if (lenis && locks.size) lenis.stop()
}
export const getLenis = () => lenis

/** Trava/destrava o scroll. Cada chamador usa sua própria chave (menu, lightbox, intro). */
export const lockScroll = (key, locked) => {
  if (locked) locks.add(key)
  else locks.delete(key)
  document.documentElement.classList.toggle('scroll-locked', locks.size > 0)
  if (locks.size) {
    lenis?.stop()
    return
  }
  lenis?.start()
  if (pending) {
    const [target, opts] = pending
    pending = null
    requestAnimationFrame(() => scrollToTarget(target, opts))
  }
}

/** Rola até um seletor/elemento/número usando o Lenis quando disponível. */
// O Lenis já respeita o scroll-margin-top das seções (scroll-mt-20), então offset padrão = 0
export const scrollToTarget = (target, { offset = 0 } = {}) => {
  if (locks.size) {
    pending = [target, { offset }]
    return
  }
  if (lenis) {
    lenis.scrollTo(target, { offset, force: true, duration: 1.4 })
    return
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: reducedMotion() ? 'auto' : 'smooth' })
    return
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target
  el?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' })
}

/* ---------- Intro (preloader → hero) ---------- */
let introResolved = false
let resolveIntro
const introPromise = new Promise((r) => (resolveIntro = r))

export const finishIntro = () => {
  if (introResolved) return
  introResolved = true
  resolveIntro()
}

export const onIntroDone = (cb) => introPromise.then(cb)

/* ---------- View Transitions ---------- */
export const viewTransition = (update) => {
  if (!document.startViewTransition || reducedMotion()) {
    update()
    return null
  }
  const vt = document.startViewTransition(update)
  // Aborta sem erro se a aba estiver oculta ou a transição for interrompida
  vt.ready.catch(() => {})
  return vt
}

import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 12, suffix: '+', label: 'Anos de experiência' },
  { value: 100, suffix: '+', label: 'Projetos concluídos' },
  { value: 100, suffix: '+', label: 'Clientes satisfeitos' },
  { value: 10, suffix: '', label: 'Áreas de atuação' },
]

const easeOut = (t) => 1 - Math.pow(1 - t, 4)

const Counter = ({ value, suffix, run }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!run) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(value)
      return
    }
    let frame
    const start = performance.now()
    const duration = 1800
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      setCount(Math.round(easeOut(t) * value))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [run, value])

  return (
    <span className="tabular-nums">
      {count}
      <span className="text-brand-500">{suffix}</span>
    </span>
  )
}

const Stats = () => {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative isolate overflow-hidden border-y border-line bg-ink-900 bg-noise">
      <div className="absolute inset-0 -z-10 bg-blueprint opacity-70" />
      <div className="absolute top-1/2 left-1/2 -z-10 h-64 w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/15 blur-[100px]" />

      <div className="container-x grid grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`reveal flex flex-col gap-3 py-12 sm:py-16 ${i % 2 === 1 ? 'border-l border-line pl-6 sm:pl-10' : ''} ${
              i > 0 ? 'lg:border-l lg:border-line lg:pl-10' : ''
            } ${i < 2 ? 'border-b border-line lg:border-b-0' : ''}`}
          >
            <span className="font-display text-6xl leading-none font-extrabold text-white sm:text-7xl xl:text-8xl">
              <Counter value={stat.value} suffix={stat.suffix} run={visible} />
            </span>
            <span className="font-mono text-xs tracking-[0.18em] text-zinc-400 uppercase">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stats

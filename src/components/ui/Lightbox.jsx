import { useEffect, useId, useLayoutEffect, useRef } from 'react'
import { categoryLabel } from '../../data/projects'
import { lockScroll } from '../../lib/motion'

/**
 * Lightbox baseado no <dialog> nativo: foco preso, ESC e camada "top-layer"
 * sem precisar de portal. `index === null` mantém fechado.
 */
const Lightbox = ({ items, index, onClose, onChange }) => {
  const dialogRef = useRef(null)
  const lockId = useId()
  const isOpen = index !== null && index !== undefined
  const item = isOpen ? items[index] : null

  // useLayoutEffect: o showModal() precisa acontecer dentro do flushSync da
  // View Transition, para que a foto "voe" da miniatura até o lightbox.
  useLayoutEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
    lockScroll(lockId, isOpen)
  }, [isOpen, lockId])

  const go = (step) => onChange((index + step + items.length) % items.length)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
      aria-label={item ? item.title : 'Visualização do projeto'}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-4 text-white backdrop:bg-ink-950/90 backdrop:backdrop-blur-md open:grid open:place-items-center sm:p-10"
    >
      {item && (
        <>
          <figure
            key={item.image}
            className="flex max-h-full w-full max-w-5xl flex-col items-center gap-5"
          >
            <img
              src={item.image}
              alt={item.title}
              style={{ viewTransitionName: 'lightbox-img' }}
              className="max-h-[72dvh] w-auto max-w-full rounded-2xl object-contain shadow-2xl ring-1 ring-line-strong"
            />
            <figcaption className="animate-fade-up text-center [animation-delay:150ms]">
              <span className="font-mono text-xs tracking-[0.2em] text-brand-400 uppercase">
                {categoryLabel(item)} · {String(index + 1).padStart(2, '0')}/{String(items.length).padStart(2, '0')}
              </span>
              <h3 className="mt-2 font-display text-3xl font-bold uppercase">{item.title}</h3>
              {item.description && <p className="mt-1 text-zinc-400">{item.description}</p>}
            </figcaption>
          </figure>

          <button
            onClick={onClose}
            aria-label="Fechar"
            className="fixed top-4 right-4 grid size-12 place-items-center rounded-full border border-line-strong bg-ink-900/80 transition hover:border-brand-500 hover:bg-brand-500 sm:top-6 sm:right-6"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {items.length > 1 && (
            <>
              <button
                onClick={() => go(-1)}
                aria-label="Anterior"
                className="fixed top-1/2 left-3 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-ink-900/80 transition hover:border-brand-500 hover:bg-brand-500 sm:left-6 sm:size-14"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Próximo"
                className="fixed top-1/2 right-3 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-ink-900/80 transition hover:border-brand-500 hover:bg-brand-500 sm:right-6 sm:size-14"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}
        </>
      )}
    </dialog>
  )
}

export default Lightbox

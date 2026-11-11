import { useEffect, useRef, useState } from 'react'
import SectionHeading from '../ui/SectionHeading'
import Roll from '../ui/Roll'

const WHATSAPP_NUMBER = '5584999263052'

const serviceOptions = [
  'Isolamento Térmico',
  'Isolamento Acústico',
  'Proteção Passiva',
  'Alpinismo Industrial',
  'Pintura Industrial',
  'Solda e Caldeira',
  'Outro',
]

const contactInfo = [
  {
    label: 'Telefone / WhatsApp',
    lines: [
      { text: '(84) 9 9926-3052', href: 'tel:+5584999263052' },
      { text: '(84) 9 9907-4059', href: 'tel:+5584999074059' },
    ],
    icon: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />,
  },
  {
    label: 'E-mail',
    lines: [{ text: 'comercial@barachorn.com', href: 'mailto:comercial@barachorn.com' }],
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 6l-10 7L2 6" />
      </>
    ),
  },
  {
    label: 'Localização',
    lines: [{ text: 'Atendemos todo o Brasil' }],
    icon: (
      <>
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
  {
    label: 'Responsável',
    lines: [{ text: 'Assis Baracho' }],
    icon: (
      <>
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
  },
]

const emptyForm = { name: '', email: '', phone: '', service: '', message: '' }

const fieldClass =
  'peer w-full rounded-xl border border-line-strong bg-ink-950/60 px-4 py-3.5 text-white placeholder:text-zinc-600 transition outline-none focus:border-brand-500 focus:bg-ink-950 focus:ring-4 focus:ring-brand-500/15 user-invalid:border-brand-400'

const Field = ({ label, children }) => (
  <label className="flex flex-col gap-2">
    <span className="text-sm font-medium text-zinc-300">{label}</span>
    {children}
  </label>
)

const Contact = () => {
  const [form, setForm] = useState(emptyForm)
  const formRef = useRef(null)

  // A borda animada só gira quando o formulário está visível
  useEffect(() => {
    const el = formRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => el.toggleAttribute('data-inview', entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const message = [
      '*Solicitação de Orçamento*',
      '',
      `*Nome:* ${form.name}`,
      `*Telefone:* ${form.phone}`,
      `*E-mail:* ${form.email}`,
      `*Serviço:* ${form.service}`,
      `*Mensagem:* ${form.message}`,
    ].join('\n')

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener')
    setForm(emptyForm)
  }

  return (
    <section id="contact" className="relative isolate scroll-mt-20 overflow-hidden py-24 sm:py-32">
      <div className="absolute -top-40 -right-40 -z-10 size-[40rem] rounded-full bg-brand-600/10 blur-[140px]" />

      <div className="container-x grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading index="04" eyebrow="Contato" title={<>Vamos falar do seu <span className="text-brand-500">projeto</span></>}>
            Solicite um orçamento sem compromisso. Preencha o formulário e continue a conversa direto no nosso WhatsApp.
          </SectionHeading>

          <ul className="mt-12 divide-y divide-line border-y border-line">
            {contactInfo.map((info) => (
              <li key={info.label} className="reveal flex items-start gap-5 py-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-line-strong text-brand-400">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {info.icon}
                  </svg>
                </span>
                <div>
                  <p className="font-mono text-[0.7rem] tracking-[0.18em] text-zinc-500 uppercase">{info.label}</p>
                  {info.lines.map((line) =>
                    line.href ? (
                      <a key={line.text} href={line.href} className="block text-lg font-medium text-white transition-colors hover:text-brand-400">
                        {line.text}
                      </a>
                    ) : (
                      <p key={line.text} className="text-lg font-medium text-white">
                        {line.text}
                      </p>
                    )
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal self-start">
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          className="border-spin relative flex flex-col gap-5 rounded-3xl p-6 shadow-2xl sm:p-10"
        >
          <div className="mb-2 flex items-center justify-between gap-4">
            <h3 className="font-display text-3xl font-bold text-white uppercase">Pedir orçamento</h3>
            <span className="flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.15em] text-zinc-400 uppercase">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Via WhatsApp
            </span>
          </div>

          <Field label="Nome completo *">
            <input type="text" name="name" value={form.name} onChange={handleChange} required autoComplete="name" placeholder="Digite seu nome" className={fieldClass} />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="E-mail *">
              <input type="email" name="email" value={form.email} onChange={handleChange} required autoComplete="email" placeholder="seu@email.com" className={fieldClass} />
            </Field>
            <Field label="Telefone *">
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} required autoComplete="tel" placeholder="(XX) XXXXX-XXXX" className={fieldClass} />
            </Field>
          </div>

          <Field label="Serviço de interesse *">
            <div className="relative">
              <select name="service" value={form.service} onChange={handleChange} required className={`${fieldClass} appearance-none pr-12 invalid:text-zinc-600`}>
                <option value="" disabled>
                  Selecione um serviço
                </option>
                {serviceOptions.map((s) => (
                  <option key={s} value={s} className="bg-ink-900 text-white">
                    {s}
                  </option>
                ))}
              </select>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-zinc-500" aria-hidden="true">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Field>

          <Field label="Mensagem *">
            <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Descreva seu projeto..." className={`${fieldClass} resize-y [field-sizing:content] min-h-32`} />
          </Field>

          <button type="submit" className="btn btn-primary mt-2 w-full !py-4 text-base">
            <Roll>Enviar pelo WhatsApp</Roll>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p className="text-center text-xs text-zinc-500">Seus dados são usados apenas para responder ao seu pedido.</p>
        </form>
        </div>
      </div>
    </section>
  )
}

export default Contact

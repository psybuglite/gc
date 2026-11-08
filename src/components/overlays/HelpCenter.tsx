import { useState } from 'react'
import { Button } from '../Button'
import { UiIcon, type UiIconName } from '../icons/UiIcon'
import { Overlay } from './Overlay'

const FAQS = [
  { q: 'How long does approval take?', a: 'We check your ID after you submit, usually within 24–48 hours. We’ll email you as soon as there’s an update.' },
  { q: 'Why do you need my ID?', a: 'Guides only accept verified travellers, and travellers want to know their guide is real. Your ID is encrypted, stored securely and never shown to travellers.' },
  { q: 'What does guideConnect charge?', a: 'A 15% fee on each booking, taken from your hourly rate. Travellers never pay booking fees.' },
  { q: 'Can I change my answers later?', a: 'Yes. Your progress saves as you go, and you can edit your profile any time.' },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border-strong">
      <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="flex w-full cursor-pointer items-center gap-3 py-4 text-left">
        <span className="min-w-px flex-1 text-base leading-6 font-semibold text-text-primary">{q}</span>
        <UiIcon name="chevron-down" size={20} className={`shrink-0 text-text-secondary transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="m-0 pb-4 text-sm leading-5 text-text-secondary">{a}</p>}
    </div>
  )
}

/** UI/Help Panel — FAQs with a route to support. */
export function HelpPanel({ open, onClose, onContact }: { open: boolean; onClose: () => void; onContact: () => void }) {
  return (
    <Overlay open={open} onClose={onClose} variant="side" title="Questions?">
      <p className="m-0 text-sm leading-5 text-text-secondary">Quick answers about applying to guide.</p>
      <div className="flex flex-col">
        {FAQS.map((f) => (
          <FaqItem key={f.q} {...f} />
        ))}
      </div>
      <div className="flex flex-col gap-3 rounded-xl bg-bg-surface-muted p-4">
        <p className="m-0 text-base leading-6 font-semibold text-text-primary">Still need help?</p>
        <Button variant="outline" fullWidth onClick={onContact}>
          Contact support
        </Button>
      </div>
    </Overlay>
  )
}

const CHANNELS: { icon: UiIconName; title: string; detail: string; href: string }[] = [
  { icon: 'message-chat-circle', title: 'Chat with us', detail: 'Message the support team in the app', href: 'mailto:support@guideconnect.com?subject=Guide%20application' },
  { icon: 'mail-01', title: 'Email', detail: 'support@guideconnect.com', href: 'mailto:support@guideconnect.com' },
  { icon: 'help-circle', title: 'Help centre', detail: 'Guides and answers for new guides', href: 'https://guideconnect.com/help' },
]

/** UI/Support Panel — ways to reach the team. Links are placeholders until real channels exist. */
export function SupportPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Overlay open={open} onClose={onClose} variant="side" title="Contact support">
      <p className="m-0 text-sm leading-5 text-text-secondary">Our team is here to help with your application.</p>
      <div className="flex flex-col gap-2">
        {CHANNELS.map((c) => (
          <a key={c.title} href={c.href} className="flex items-center gap-3 rounded-xl border border-border-strong px-4 py-3.5 no-underline">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-subtle text-brand-text">
              <UiIcon name={c.icon} size={20} />
            </span>
            <span className="flex min-w-px flex-1 flex-col gap-0.5">
              <span className="text-base leading-6 font-semibold text-text-primary">{c.title}</span>
              <span className="truncate text-sm leading-5 text-text-secondary">{c.detail}</span>
            </span>
            <UiIcon name="chevron-right" size={20} className="shrink-0 text-text-secondary" />
          </a>
        ))}
      </div>
    </Overlay>
  )
}

/** Help + support panels wired together (help → "Contact support" swaps to the support panel). */
export function HelpCenter({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [support, setSupport] = useState(false)
  return (
    <>
      <HelpPanel open={open && !support} onClose={onClose} onContact={() => setSupport(true)} />
      <SupportPanel
        open={open && support}
        onClose={() => {
          setSupport(false)
          onClose()
        }}
      />
    </>
  )
}

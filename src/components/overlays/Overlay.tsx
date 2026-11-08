import { useEffect, useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { UiIcon } from '../icons/UiIcon'

type OverlayProps = {
  open: boolean
  onClose: () => void
  /** "dialog": centred modal on desktop. "side": right-hand side sheet on desktop. Both are bottom sheets on mobile. */
  variant?: 'dialog' | 'side'
  title: string
  subtitle?: string
  children: ReactNode
}

const PANEL = {
  dialog:
    'md:top-1/2 md:bottom-auto md:left-1/2 md:max-h-[calc(100dvh-48px)] md:w-[528px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-[24px] md:p-6 md:shadow-[0_16px_48px_rgb(0_0_0/0.16)]',
  side: 'md:top-0 md:right-0 md:left-auto md:h-dvh md:max-h-none md:w-[464px] md:rounded-none md:p-8 md:shadow-[-8px_0_48px_rgb(0_0_0/0.16)]',
}

/** Scrim + panel. Desktop: dialog or side sheet. Mobile: bottom sheet with grabber. Esc / scrim click closes. */
export function Overlay({ open, onClose, variant = 'dialog', title, subtitle, children }: OverlayProps) {
  const titleId = useId()
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panel.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      previous?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null
  return createPortal(
    <div className="fixed inset-0 z-50">
      <button type="button" aria-label="Close" tabIndex={-1} onClick={onClose} className="absolute inset-0 size-full cursor-default bg-overlay-scrim" />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`absolute right-0 bottom-0 left-0 flex max-h-[92dvh] flex-col gap-3 overflow-hidden rounded-t-[38px] bg-bg-surface px-4 pt-2 pb-[max(34px,env(safe-area-inset-bottom))] outline-none ${PANEL[variant]}`}
      >
        <div className="flex justify-center py-1 md:hidden" aria-hidden="true">
          <span className="h-[5px] w-9 rounded-[3px] bg-border-strong" />
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-px flex-col gap-0.5">
              <h2 id={titleId} className="m-0 text-xl leading-7 font-semibold text-text-primary">{title}</h2>
              {subtitle && <p className="m-0 text-sm leading-5 text-text-secondary">{subtitle}</p>}
            </div>
            <button type="button" onClick={onClose} aria-label="Close" className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-bg-surface-muted text-text-primary">
              <UiIcon name="x-close" size={18} />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  )
}

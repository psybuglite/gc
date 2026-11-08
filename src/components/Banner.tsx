import type { ReactNode } from 'react'
import { UiIcon, type UiIconName } from './icons/UiIcon'

const TONES = {
  warning: { box: 'bg-warning-bg', title: 'text-warning-text', icon: 'alert-circle' as UiIconName },
  success: { box: 'bg-success-bg', title: 'text-success-text', icon: 'check' as UiIconName },
}

/** Inline callout used on the resubmit screens. */
export function Banner({ tone, title, children }: { tone: keyof typeof TONES; title: string; children: ReactNode }) {
  const t = TONES[tone]
  return (
    <div role="status" className={`flex w-full items-start gap-3 rounded-xl p-4 ${t.box}`}>
      <UiIcon name={t.icon} size={20} className={`shrink-0 ${t.title}`} />
      <div className="flex min-w-px flex-1 flex-col gap-0.5 text-sm leading-5">
        <p className={`m-0 font-semibold ${t.title}`}>{title}</p>
        <p className="m-0 text-text-secondary">{children}</p>
      </div>
    </div>
  )
}

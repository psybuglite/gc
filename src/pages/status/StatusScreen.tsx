import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'
import { StatusTracker, type Stage } from '../../components/StatusTracker'
import { TopBar } from '../../components/TopBar'
import { UiIcon, type UiIconName } from '../../components/icons/UiIcon'

export type StatusTone = 'success' | 'info' | 'warning' | 'danger'

const TONES: Record<StatusTone, string> = {
  success: 'bg-success-bg text-success-text',
  info: 'bg-info-bg text-info-text',
  warning: 'bg-warning-bg text-warning-text',
  danger: 'bg-danger-bg text-danger-text',
}

export type StatusAction = { label: string; to?: string; onClick?: () => void; variant?: 'primary' | 'outline'; desktopOnly?: boolean }

type StatusScreenProps = {
  tone: StatusTone
  icon: UiIconName
  title: ReactNode
  subtitle: ReactNode
  stages: Stage[]
  actions: StatusAction[]
  children?: ReactNode
}

function ActionButton({ a, fullWidth }: { a: StatusAction; fullWidth?: boolean }) {
  const btn = (
    <Button variant={a.variant ?? 'primary'} fullWidth={fullWidth} onClick={a.onClick}>
      {a.label}
    </Button>
  )
  return a.to ? <Link to={a.to} className={fullWidth ? 'block w-full' : undefined}>{btn}</Link> : btn
}

/** Shared frame for the application status screens: icon, heading, tracker, detail card, actions. */
export function StatusScreen({ tone, icon, title, subtitle, stages, actions, children }: StatusScreenProps) {
  const primary = actions.find((a) => !a.desktopOnly && (a.variant ?? 'primary') === 'primary') ?? actions[0]
  return (
    <div className="flex min-h-dvh flex-col bg-bg-surface">
      <TopBar />
      <main className="flex flex-1 flex-col items-center px-4 pt-4 pb-6 md:px-20 md:pt-10 md:pb-8">
        <div className="flex w-full max-w-[560px] flex-col items-center gap-6">
          <div className={`flex size-[72px] items-center justify-center rounded-full ${TONES[tone]}`}>
            <UiIcon name={icon} size={32} />
          </div>
          <div className="flex w-full flex-col items-center gap-2 text-center">
            <h1 className="m-0 w-full text-2xl leading-8 font-semibold text-text-primary md:text-[40px] md:leading-[52px] md:tracking-[-0.6px]">{title}</h1>
            <p className="m-0 w-full text-base leading-6 text-text-secondary">{subtitle}</p>
          </div>
          <StatusTracker stages={stages} />
          {children}
          <div className="hidden items-center gap-3 md:flex">
            {actions.map((a) => (
              <ActionButton key={a.label} a={a} />
            ))}
          </div>
        </div>
      </main>
      <footer className="sticky bottom-0 z-10 bg-bg-surface px-4 pt-2 pb-[max(34px,env(safe-area-inset-bottom))] md:hidden">
        <ActionButton a={primary} fullWidth />
      </footer>
    </div>
  )
}

/** Muted rounded card with an optional 18px heading. */
export function StatusCard({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="flex w-full flex-col gap-4 rounded-2xl bg-bg-surface-muted p-6">
      {title && <h2 className="m-0 text-lg leading-[26px] font-semibold text-text-primary">{title}</h2>}
      {children}
    </section>
  )
}

/** Numbered row used by "What happens next" / "Where things stand". */
export function NumberedItem({ n, title, detail, detailTone }: { n: number; title: string; detail?: string; detailTone?: 'success' }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-bg-surface text-xs leading-[18px] font-semibold text-brand-text">{n}</span>
      <div className="flex min-w-px flex-1 flex-col gap-0.5 text-sm leading-5">
        <span className="font-semibold text-text-primary">{title}</span>
        {detail && <span className={detailTone === 'success' ? 'text-success-text' : 'text-text-tertiary'}>{detail}</span>}
      </div>
    </div>
  )
}

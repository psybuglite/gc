import { UiIcon } from './icons/UiIcon'

export type Stage = {
  label: string
  /** Shorter label used on small screens. */
  shortLabel?: string
  state: 'done' | 'current' | 'upcoming' | 'warning' | 'danger'
}

const styles: Record<Stage['state'], string> = {
  done: 'bg-success-bg text-success-text',
  current: 'bg-brand-subtle text-brand-text',
  upcoming: 'bg-bg-surface-muted text-text-tertiary',
  warning: 'bg-warning-bg text-warning-text',
  danger: 'bg-danger-bg text-danger-text',
}

function Marker({ state }: { state: Stage['state'] }) {
  if (state === 'done') return <UiIcon name="check" size={14} />
  if (state === 'warning') return <UiIcon name="alert-circle" size={14} />
  if (state === 'danger') return <UiIcon name="x-close" size={14} />
  return <span className="size-2 rounded-full bg-current" />
}

/** UI/Status Tracker — pills joined by connectors (connectors hidden on small screens). */
export function StatusTracker({ stages }: { stages: Stage[] }) {
  return (
    <ol className="m-0 flex list-none flex-wrap items-center justify-center gap-1.5 p-0 max-md:-mx-2 md:gap-2" aria-label="Application progress">
      {stages.map((s, i) => (
        <li key={s.label} className="flex items-center md:gap-2" aria-current={s.state === 'current' ? 'step' : undefined}>
          {i > 0 && <span className="hidden h-0.5 w-6 bg-border-strong md:block" aria-hidden="true" />}
          <span className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm leading-5 font-semibold whitespace-nowrap md:text-xs md:leading-[18px] ${styles[s.state]}`}>
            <Marker state={s.state} />
            {s.shortLabel ? (
              <>
                <span className="md:hidden">{s.shortLabel}</span>
                <span className="max-md:hidden">{s.label}</span>
              </>
            ) : (
              s.label
            )}
          </span>
        </li>
      ))}
    </ol>
  )
}

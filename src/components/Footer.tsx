import { Button } from './Button'

type FooterProps = {
  /** Current step, 1-based. */
  step: number
  totalSteps?: number
  /** How many quarters (0–4) of the current step are filled. */
  quarters?: number
  label: string
  /** Replaces the "Step n of m · label" text (e.g. on the resubmit screen). */
  fullLabel?: string
  onBack?: () => void
  onNext?: () => void
  nextLabel?: string
  nextDisabled?: boolean
}

/** UI/Footer — segmented progress (each step split into quarters), step label, Back and Next. */
export function Footer({ step, totalSteps = 6, quarters = 2, label, fullLabel, onBack, onNext, nextLabel = 'Next', nextDisabled }: FooterProps) {
  const text = fullLabel ?? `Step ${step} of ${totalSteps} · ${label}`
  return (
    <footer className="sticky bottom-0 z-10 w-full bg-bg-surface">
      <div className="flex items-start gap-1 px-4 pt-3 md:px-20 md:pt-4" role="progressbar" aria-label={text} aria-valuemin={0} aria-valuemax={totalSteps * 4} aria-valuenow={(step - 1) * 4 + quarters}>
        {Array.from({ length: totalSteps }, (_, i) => {
          const filled = i + 1 < step ? 4 : i + 1 === step ? quarters : 0
          return (
            <div key={i} className="flex h-1 min-w-px flex-1 overflow-hidden rounded-full bg-border-subtle">
              {Array.from({ length: 4 }, (_, q) => (
                <div key={q} className={`h-full min-w-px flex-1 ${q < filled ? 'bg-brand-primary' : ''}`} />
              ))}
            </div>
          )
        })}
      </div>
      <p className="m-0 px-4 pt-2 text-sm font-medium text-text-secondary md:hidden">{text}</p>
      <div className="flex items-center justify-between px-4 pt-2 pb-[max(34px,env(safe-area-inset-bottom))] md:px-20 md:py-4">
        <button type="button" onClick={onBack} className="cursor-pointer px-1 py-3.5 text-base font-semibold text-text-primary">
          Back
        </button>
        <p className="m-0 hidden text-sm font-medium text-text-secondary md:block">{text}</p>
        <Button onClick={onNext} disabled={nextDisabled}>
          {nextLabel}
        </Button>
      </div>
    </footer>
  )
}

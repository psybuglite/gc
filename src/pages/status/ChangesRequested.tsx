import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import { UiIcon } from '../../components/icons/UiIcon'
import { StatusScreen } from './StatusScreen'

const FIXES = [
  { area: 'ID', text: 'Your passport photo is blurry', to: '/apply/id?resubmit=1' },
  { area: 'References', text: 'Reference 2’s email bounced', to: '/apply/references?resubmit=1' },
]

/** Changes requested (Figma 16089:6877 / mobile 16089:6945). Review notes are sample data until there's an API. */
export default function ChangesRequested() {
  const navigate = useNavigate()
  return (
    <StatusScreen
      tone="warning"
      icon="alert-circle"
      title="Almost there — 2 quick fixes"
      subtitle="Everything else is saved. Fix these and resubmit."
      stages={[
        { label: 'Submitted', state: 'done' },
        { label: 'Under review', state: 'done' },
        { label: 'Changes requested', shortLabel: 'Needs changes', state: 'warning' },
      ]}
      actions={[{ label: 'Start fixing', onClick: () => navigate(FIXES[0].to) }]}
    >
      <div className="flex w-full items-start gap-3">
        <span className="size-10 shrink-0 rounded-full bg-brand-subtle" aria-hidden="true" />
        <div className="flex min-w-px flex-1 flex-col gap-1 rounded-xl bg-bg-surface-muted px-4 py-3.5">
          <p className="m-0 text-xs leading-[18px] font-semibold text-text-tertiary">guideConnect review team</p>
          <p className="m-0 text-sm leading-5 text-text-secondary">Thanks for applying! We just need a clearer ID photo and a working email for your second reference.</p>
        </div>
      </div>
      <ul className="m-0 flex w-full list-none flex-col border-y border-border-subtle p-0">
        {FIXES.map((f, i) => (
          <li key={f.area} className={`flex items-center gap-3 py-4 ${i > 0 ? 'border-t border-border-subtle' : ''}`}>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-warning-bg text-warning-text">
              <UiIcon name="alert-circle" size={18} />
            </span>
            <div className="flex min-w-px flex-1 flex-col gap-0.5">
              <span className="text-xs leading-[18px] font-semibold text-text-tertiary">{f.area}</span>
              <span className="text-base leading-6 font-semibold text-text-primary">{f.text}</span>
            </div>
            <Button variant="outline" size="small" onClick={() => navigate(f.to)}>
              Fix
            </Button>
          </li>
        ))}
      </ul>
    </StatusScreen>
  )
}

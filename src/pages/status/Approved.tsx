import { UiIcon, type UiIconName } from '../../components/icons/UiIcon'
import { useApplication } from '../../state/application'
import { StatusCard, StatusScreen } from './StatusScreen'

const NEXT: { icon: UiIconName; title: string; detail: string }[] = [
  { icon: 'map-01', title: 'Create your first tour', detail: 'Title, route and what’s included' },
  { icon: 'calendar', title: 'Add your availability', detail: 'The days and hours you can guide' },
  { icon: 'currency-dollar', title: 'Add payout details', detail: 'Get paid after every tour' },
]

/** Approved (Figma 16089:7381 / mobile 16089:7451). The guide dashboard isn't built yet, so its button returns to the start. */
export default function Approved() {
  const { data } = useApplication()
  return (
    <StatusScreen
      tone="success"
      icon="check"
      title={`You’re in, ${data.firstName || 'guide'}! 🎉`}
      subtitle="Welcome to guideConnect. Three quick steps and travellers can book you."
      stages={[
        { label: 'Submitted', state: 'done' },
        { label: 'Under review', state: 'done' },
        { label: 'Approved', state: 'done' },
      ]}
      actions={[{ label: 'Go to guide dashboard', to: '/apply' }]}
    >
      <StatusCard title="Get ready for your first booking">
        {NEXT.map((n) => (
          <button key={n.title} type="button" className="flex w-full cursor-pointer items-center gap-3 text-left">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-bg-surface text-brand-text">
              <UiIcon name={n.icon} size={20} />
            </span>
            <span className="flex min-w-px flex-1 flex-col gap-0.5 text-sm leading-5">
              <span className="font-semibold text-text-primary">{n.title}</span>
              <span className="text-text-secondary">{n.detail}</span>
            </span>
            <UiIcon name="chevron-right" size={20} className="text-text-secondary" />
          </button>
        ))}
      </StatusCard>
    </StatusScreen>
  )
}

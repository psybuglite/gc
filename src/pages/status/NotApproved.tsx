import { useState } from 'react'
import { UiIcon } from '../../components/icons/UiIcon'
import { SupportPanel } from '../../components/overlays/HelpCenter'
import { StatusCard, StatusScreen } from './StatusScreen'

const NEXT_STEPS = ['Reapply from 2 February 2027', 'Choose references who expect to hear from us', 'Many great guides get approved on their second try']

/** Not approved (Figma 16089:7535 / mobile 16089:7595). Reason and reapply date are sample data until there's an API. */
export default function NotApproved() {
  const [support, setSupport] = useState(false)
  return (
    <>
      <StatusScreen
        tone="danger"
        icon="x-close"
        title="Not approved this time"
        subtitle="Thanks for applying, Amaka. Here’s why, and what you can do next."
        stages={[
          { label: 'Submitted', state: 'done' },
          { label: 'Under review', state: 'done' },
          { label: 'Not approved', state: 'danger' },
        ]}
        actions={[
          { label: 'Back to home', to: '/apply' },
          { label: 'Contact support', variant: 'outline', desktopOnly: true, onClick: () => setSupport(true) },
        ]}
      >
        <StatusCard>
          <div className="flex flex-col gap-1 text-base leading-6">
            <p className="m-0 font-semibold text-text-primary">Why</p>
            <p className="m-0 text-text-secondary">We couldn’t verify your references — neither replied within 14 days.</p>
          </div>
          <h2 className="m-0 text-lg leading-[26px] font-semibold text-text-primary">What you can do</h2>
          {NEXT_STEPS.map((t) => (
            <div key={t} className="flex items-start gap-2">
              <UiIcon name="check" size={16} className="mt-0.5 shrink-0 text-text-secondary" />
              <p className="m-0 min-w-px flex-1 text-sm leading-5 text-text-secondary">{t}</p>
            </div>
          ))}
        </StatusCard>
      </StatusScreen>
      <SupportPanel open={support} onClose={() => setSupport(false)} />
    </>
  )
}

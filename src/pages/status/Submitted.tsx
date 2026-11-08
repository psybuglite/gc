import { useApplication } from '../../state/application'
import { NumberedItem, StatusCard, StatusScreen } from './StatusScreen'

/** Application submitted (Figma 16088:6931 / mobile 16088:6986). */
export default function Submitted() {
  const { data } = useApplication()
  return (
    <StatusScreen
      tone="success"
      icon="check"
      title="Application submitted!"
      subtitle={`Thanks, ${data.firstName || 'there'}. We’ll email you as soon as there’s an update.`}
      stages={[
        { label: 'Submitted', state: 'current' },
        { label: 'Under review', state: 'upcoming' },
        { label: 'Decision', state: 'upcoming' },
      ]}
      actions={[{ label: 'Go to dashboard', to: '/apply/status/review' }]}
    >
      <StatusCard title="What happens next">
        <NumberedItem n={1} title="We verify your ID" detail="Usually within 24–48 hours" />
        <NumberedItem n={2} title="We email your references" />
        <NumberedItem n={3} title="We review your profile and let you know" />
      </StatusCard>
    </StatusScreen>
  )
}

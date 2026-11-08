import { NumberedItem, StatusCard, StatusScreen } from './StatusScreen'

/** Under review (Figma 16088:7056 / mobile 16088:7114). Progress values are sample data until there's an API. */
export default function UnderReview() {
  return (
    <StatusScreen
      tone="info"
      icon="clock"
      title="Your application is in review"
      subtitle="We’ll email you and send a notification the moment there’s news."
      stages={[
        { label: 'Submitted', state: 'done' },
        { label: 'Under review', state: 'current' },
        { label: 'Decision', state: 'upcoming' },
      ]}
      actions={[{ label: 'Back to home', to: '/apply' }]}
    >
      <StatusCard title="Where things stand">
        <NumberedItem n={1} title="ID verified" detail="Done" detailTone="success" />
        <NumberedItem n={2} title="References" detail="1 of 2 replied" />
        <NumberedItem n={3} title="Profile review" detail="In progress" />
      </StatusCard>
    </StatusScreen>
  )
}

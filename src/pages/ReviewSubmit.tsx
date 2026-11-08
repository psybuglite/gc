import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Checkbox } from '../components/Checkbox'
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon'
import { WizardLayout } from '../layouts/WizardLayout'
import { useApplication } from '../state/application'
import { ID_TYPES } from './IdVerification'

type RowProps = { title: string; summary: string; details?: string[]; editTo: string }

/** UI/Review Row — title + summary + Edit link; chevron expands extra detail. */
function ReviewRow({ title, summary, details = [], editTo }: RowProps) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border-subtle py-2.5">
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex min-w-px flex-1 cursor-pointer flex-col items-start gap-0.5 text-left">
          <span className="text-sm leading-[18px] font-semibold text-text-tertiary">{title}</span>
          <span className="text-base leading-[18px] font-medium text-text-primary">{summary}</span>
        </button>
        <button type="button" onClick={() => navigate(editTo)} className="cursor-pointer px-1 py-2 text-sm leading-[18px] font-semibold text-text-primary">
          Edit
        </button>
        <button type="button" onClick={() => setOpen((o) => !o)} aria-label={open ? 'Collapse' : 'Expand'} className="flex size-5 cursor-pointer items-center justify-center text-text-secondary">
          <ChevronDownIcon className={`size-5 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
      {open && details.length > 0 && (
        <ul className="m-0 mt-2 flex list-none flex-col gap-1 p-0">
          {details.map((d) => (
            <li key={d} className="text-sm leading-[18px] text-text-secondary">
              {d}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const AGREEMENTS = [
  'My information is accurate and complete',
  'I have the legal right to offer guided experiences, including any licences required',
  'I’ll follow guideConnect’s safety guidelines',
  'I agree to the Guide Terms of Service',
]

/** Step 6 — Review & submit (Figma 16088:6661 / mobile 16088:6797). */
export default function ReviewSubmit() {
  const navigate = useNavigate()
  const { data, attachments } = useApplication()
  const [agreed, setAgreed] = useState<boolean[]>(AGREEMENTS.map(() => false))
  const [tried, setTried] = useState(false)
  const all = agreed.every(Boolean)
  const photos = attachments.photos.filter((p) => p.progress === 100).length
  const idLabel = ID_TYPES.find((t) => t.id === data.idType)?.label ?? 'ID'

  return (
    <WizardLayout
      step={6}
      quarters={4}
      stepLabel="Review"
      title="Review and submit"
      subtitle="Check everything, then submit."
      backTo="/apply/references"
      nextLabel="Submit application"
      onNext={() => {
        setTried(true)
        if (all) navigate('/apply/submitted')
      }}
    >
      <div className="flex w-full flex-col">
        <ReviewRow
          title="About you"
          summary={`${data.firstName} ${data.lastName} · ${data.city}`.trim()}
          details={[data.intro, `${data.street}, ${data.city}, ${data.state}`, `Phone ${data.phone}`]}
          editTo="/apply/profile"
        />
        <ReviewRow
          title="Your experiences"
          summary={`${data.tourWord} · ${data.languages.join(', ')} · $${data.hourlyRate}/hr`}
          details={[data.experience === 'new' ? 'New to guiding' : `Experience: ${data.years}`, data.tourStory]}
          editTo="/apply/offer"
        />
        <ReviewRow title="Photos" summary={`${photos} photos added`} editTo="/apply/photos" />
        <ReviewRow
          title="ID"
          summary={`${idLabel} ending ${data.idNumber.trim().slice(-4)}`}
          details={[`Issued ${data.idIssue}`, `Expires ${data.idExpiry}`]}
          editTo="/apply/id"
        />
        <ReviewRow
          title="References"
          summary={data.references.map((r) => r.name).join(', ')}
          details={data.references.map((r) => `${r.name} · ${r.relationship} · ${r.email}`)}
          editTo="/apply/references"
        />
      </div>

      <div className="flex w-full flex-col gap-2 rounded-2xl bg-bg-surface-muted px-6 py-4">
        <h2 className="m-0 text-lg leading-5 font-semibold text-text-primary">Before you submit</h2>
        {AGREEMENTS.map((text, i) => (
          <Checkbox key={text} checked={agreed[i]} onChange={(v) => setAgreed((a) => a.map((x, j) => (j === i ? v : x)))}>
            {text}
          </Checkbox>
        ))}
        {tried && !all && (
          <p role="alert" className="m-0 text-xs leading-[18px] text-danger">
            Please tick every box to submit.
          </p>
        )}
      </div>
    </WizardLayout>
  )
}

import { useId, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Field, controlBox, controlShell } from '../components/Field'
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon'
import { MailIcon } from '../components/icons/MiscIcons'
import { TextField } from '../components/TextField'
import { WizardLayout } from '../layouts/WizardLayout'
import { useApplication, type Reference } from '../state/application'

const RELATIONSHIPS = ['Colleague', 'Friend', 'Former employer', 'Mentor', 'Neighbour', 'Past guest or client', 'Community leader']
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function RelationshipSelect({ value, error, onChange }: { value: string; error?: string; onChange: (v: string) => void }) {
  const id = useId()
  return (
    <Field label="Relationship" required htmlFor={id} error={error} className="md:min-w-px md:flex-1">
      <div className={`relative ${controlShell}`}>
        <div className={controlBox(error)}>
          <span className={`min-w-px flex-1 text-sm font-medium ${value ? 'text-text-primary' : 'text-[#3d3d3d] opacity-50'}`}>{value || 'Select relationship'}</span>
          <ChevronDownIcon className="size-6 text-text-primary opacity-80" />
        </div>
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="absolute inset-0 size-full cursor-pointer opacity-0">
          <option value="" disabled>
            Select relationship
          </option>
          {RELATIONSHIPS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
    </Field>
  )
}

/** Step 5 — References (Figma 16086:6534 / mobile 16086:6686). */
export default function References() {
  const navigate = useNavigate()
  const { data, update } = useApplication()
  const [submitted, setSubmitted] = useState(false)

  const setRef = (i: number, patch: Partial<Reference>) =>
    update({ references: data.references.map((r, idx) => (idx === i ? { ...r, ...patch } : r)) })

  const errors = data.references.map((r, i) => ({
    name: r.name.trim() ? '' : 'Enter their full name',
    relationship: r.relationship ? '' : 'Choose how they know you',
    email: !EMAIL.test(r.email.trim())
      ? 'Enter a valid email address'
      : data.references.some((o, j) => j !== i && o.email.trim().toLowerCase() === r.email.trim().toLowerCase())
        ? 'Use a different email for each reference'
        : '',
  }))
  const valid = errors.every((e) => !e.name && !e.relationship && !e.email)

  return (
    <WizardLayout
      step={5}
      quarters={4}
      stepLabel="References"
      title="Who can vouch for you?"
      subtitle="Two people who’ve seen how you treat guests. Not family."
      backTo="/apply/id"
      onNext={() => {
        setSubmitted(true)
        if (valid) navigate('/apply/review')
      }}
    >
      {data.references.map((r, i) => (
        <section key={i} className="flex w-full flex-col gap-3" aria-label={`Reference ${i + 1}`}>
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-brand-subtle text-sm font-semibold text-brand-text">{i + 1}</span>
            <h2 className="m-0 text-base font-semibold text-text-primary">Reference {i + 1}</h2>
          </div>
          <div className="flex w-full flex-col gap-4 md:flex-row">
            <TextField
              className="md:min-w-px md:flex-1"
              label="Full name"
              required
              placeholder="e.g. Tunde Bakare"
              autoComplete="off"
              value={r.name}
              error={submitted ? errors[i].name : ''}
              onChange={(name) => setRef(i, { name })}
            />
            <RelationshipSelect value={r.relationship} error={submitted ? errors[i].relationship : ''} onChange={(relationship) => setRef(i, { relationship })} />
          </div>
          <TextField
            label="Email address"
            required
            type="email"
            placeholder="name@email.com"
            autoComplete="off"
            value={r.email}
            error={submitted ? errors[i].email : ''}
            onChange={(email) => setRef(i, { email })}
          />
        </section>
      ))}
      <div className="flex w-full items-start gap-2 text-text-tertiary">
        <MailIcon className="mt-px size-4 shrink-0" />
        <p className="m-0 min-w-px flex-1 text-sm">We’ll email them after you submit. It takes about 2 minutes.</p>
      </div>
    </WizardLayout>
  )
}

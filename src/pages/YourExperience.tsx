import { useId, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Field, controlBox, controlShell } from '../components/Field'
import { OptionCard } from '../components/OptionCard'
import { EXPERIENCE_OPTIONS, YEARS_OPTIONS } from '../data/languages'
import { WizardLayout } from '../layouts/WizardLayout'
import { useApplication } from '../state/application'

/** Step 2b — Your experience (Figma 16083:6066 / mobile 16083:6133). */
export default function YourExperience() {
  const navigate = useNavigate()
  const { data, update } = useApplication()
  const [submitted, setSubmitted] = useState(false)
  const yearsId = useId()

  const errors = {
    experience: data.experience ? '' : 'Choose one option',
    years: data.experience === 'new' || data.years ? '' : 'Select your years of experience',
  }

  return (
    <WizardLayout
      step={2}
      quarters={2}
      stepLabel="Your experiences"
      title="Have you ever shown someone around your city?"
      subtitle="Every guide starts somewhere. Choose one."
      backTo="/apply/offer"
      onNext={() => {
        setSubmitted(true)
        if (!errors.experience && !errors.years) navigate('/apply/story')
      }}
    >
      <div role="radiogroup" aria-label="Guiding experience" className="flex w-full flex-col gap-3">
        {EXPERIENCE_OPTIONS.map((o) => (
          <OptionCard
            key={o.id}
            title={o.title}
            description={o.description}
            selected={data.experience === o.id}
            onSelect={() => update({ experience: o.id })}
          />
        ))}
        {submitted && errors.experience && (
          <p role="alert" className="m-0 text-xs leading-[18px] text-danger">
            {errors.experience}
          </p>
        )}
      </div>

      <Field label="Years of experience" required htmlFor={yearsId} error={submitted ? errors.years : ''} className="w-full">
        <div className={`relative ${controlShell}`}>
          <div className={controlBox(submitted ? errors.years : '')}>
            <span className={`min-w-px flex-1 text-sm font-medium text-text-primary ${data.years ? '' : 'opacity-50'}`}>
              {data.years || '3–5 years'}
            </span>
          </div>
          <select
            id={yearsId}
            value={data.years}
            onChange={(e) => update({ years: e.target.value })}
            className="absolute inset-0 size-full cursor-pointer opacity-0"
          >
            <option value="" disabled>
              Select years
            </option>
            {YEARS_OPTIONS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </Field>
    </WizardLayout>
  )
}

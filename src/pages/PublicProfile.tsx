import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProfilePhoto } from '../components/ProfilePhoto'
import { TextField } from '../components/TextField'
import { WizardLayout } from '../layouts/WizardLayout'
import { useApplication } from '../state/application'

const INTRO_MAX = 80

/** Step 1a — Public profile (Figma 16082:5518 / mobile 16082:5619). */
export default function PublicProfile() {
  const navigate = useNavigate()
  const { data, update } = useApplication()
  const [submitted, setSubmitted] = useState(false)

  const errors = {
    firstName: data.firstName.trim() ? '' : 'Enter your first name',
    lastName: data.lastName.trim() ? '' : 'Enter your last name',
    intro: data.intro.trim() ? '' : 'Add a short intro (up to 80 characters)',
  }
  const valid = !errors.firstName && !errors.lastName && !errors.intro

  return (
    <WizardLayout
      step={1}
      quarters={2}
      stepLabel="About you"
      title="Let’s start with you"
      subtitle="This is what travellers see on your guide profile."
      backTo="/apply"
      onNext={() => {
        setSubmitted(true)
        if (valid) navigate('/apply/details')
      }}
    >
      <ProfilePhoto />
      <div className="flex w-full flex-col gap-5">
        <div className="flex w-full flex-col gap-4 md:flex-row">
          <TextField
            className="md:min-w-40 md:flex-1"
            label="First name"
            required
            placeholder="e.g. Amaka"
            autoComplete="given-name"
            value={data.firstName}
            error={submitted ? errors.firstName : ''}
            onChange={(firstName) => update({ firstName })}
          />
          <TextField
            className="md:min-w-40 md:flex-1"
            label="Last name"
            required
            placeholder="e.g. Obi"
            autoComplete="family-name"
            value={data.lastName}
            error={submitted ? errors.lastName : ''}
            onChange={(lastName) => update({ lastName })}
          />
        </div>
        <TextField
          label="One-line intro"
          required
          multiline
          maxLength={INTRO_MAX}
          placeholder="e.g. Food-loving historian who knows every hidden café in Lagos"
          value={data.intro}
          error={submitted ? errors.intro : ''}
          hint={`Shown under your name · ${data.intro.length}/${INTRO_MAX} characters`}
          onChange={(intro) => update({ intro })}
        />
      </div>
    </WizardLayout>
  )
}

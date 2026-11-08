import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { DateField, parseDate } from '../components/DateField'
import { PhoneField } from '../components/PhoneField'
import { CountrySelect } from '../components/SelectField'
import { TextField } from '../components/TextField'
import { WizardLayout } from '../layouts/WizardLayout'
import { useApplication } from '../state/application'

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex w-full flex-col gap-2">
      <h2 className="m-0 text-lg leading-[26px] font-semibold text-text-primary">{title}</h2>
      {children}
    </section>
  )
}

function isAdult(dob: Date) {
  const cutoff = new Date()
  cutoff.setFullYear(cutoff.getFullYear() - 18)
  return dob <= cutoff
}

/** Step 1b — Private details (Figma 16082:5718 / mobile 16082:5864). */
export default function PrivateDetails() {
  const navigate = useNavigate()
  const { data, update } = useApplication()
  const [submitted, setSubmitted] = useState(false)

  const dob = parseDate(data.dob)
  const phoneDigits = data.phone.replace(/\D/g, '')
  const errors = {
    dob: !dob ? 'Enter your date of birth as DD / MM / YYYY' : !isAdult(dob) ? 'You must be 18 or older' : '',
    phone: phoneDigits.length < 7 ? 'Enter a valid phone number' : '',
    street: data.street.trim() ? '' : 'Enter your street address',
    city: data.city.trim() ? '' : 'Enter your city',
    state: data.state.trim() ? '' : 'Enter your state',
  }
  const valid = Object.values(errors).every((e) => !e)
  const show = <K extends keyof typeof errors>(k: K) => (submitted ? errors[k] : '')

  return (
    <WizardLayout
      step={1}
      quarters={4}
      stepLabel="About you"
      title="A few private details"
      subtitle="Only used to verify you — never shown to travellers."
      backTo="/apply/profile"
      onNext={() => {
        setSubmitted(true)
        if (valid) navigate('/apply/offer')
      }}
    >
      <Section title="About you">
        <div className="flex w-full flex-col gap-4 md:flex-row md:items-start">
          <CountrySelect
            className="md:min-w-px md:flex-1"
            label="Nationality"
            required
            value={data.nationality}
            onChange={(nationality) => update({ nationality })}
          />
          <DateField
            className="md:min-w-px md:flex-1"
            label="Date of birth"
            required
            value={data.dob}
            hint={show('dob') ? undefined : 'You must be 18 or older'}
            error={show('dob')}
            onChange={(dobValue) => update({ dob: dobValue })}
          />
        </div>
      </Section>

      <Section title="Contact">
        <PhoneField
          required
          countryCode={data.phoneCountry}
          number={data.phone}
          error={show('phone')}
          onCountryChange={(phoneCountry) => update({ phoneCountry })}
          onNumberChange={(phone) => update({ phone })}
        />
      </Section>

      <Section title="Home address">
        <div className="flex w-full flex-col gap-4 md:flex-row">
          <TextField
            className="md:min-w-[200px] md:flex-1"
            label="Street address"
            required
            placeholder="e.g. 12 Admiralty Way"
            autoComplete="street-address"
            value={data.street}
            error={show('street')}
            onChange={(street) => update({ street })}
          />
          <TextField
            className="md:min-w-px md:flex-1"
            label="City"
            required
            placeholder="e.g. Lagos"
            autoComplete="address-level2"
            value={data.city}
            error={show('city')}
            onChange={(city) => update({ city })}
          />
          <TextField
            className="md:min-w-px md:flex-1"
            label="State"
            required
            placeholder="e.g. Lagos State"
            autoComplete="address-level1"
            value={data.state}
            error={show('state')}
            onChange={(state) => update({ state })}
          />
        </div>
      </Section>
    </WizardLayout>
  )
}

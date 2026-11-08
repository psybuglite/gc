import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Chip } from '../components/Chip'
import { RemovableChip } from '../components/RemovableChip'
import { TextField } from '../components/TextField'
import { LANGUAGES, TOUR_SUGGESTIONS } from '../data/languages'
import { WizardLayout } from '../layouts/WizardLayout'
import { useApplication } from '../state/application'

/** Step 2a — What you offer: tour in one word + languages (Figma 16083:5856 / mobile 16083:5962). */
export default function WhatYouOffer() {
  const navigate = useNavigate()
  const { data, update } = useApplication()
  const [submitted, setSubmitted] = useState(false)

  const errors = {
    word: /^\S+$/.test(data.tourWord.trim()) ? '' : 'Use one word (hyphens are fine)',
    languages: data.languages.length ? '' : 'Add at least one language',
  }
  const available = LANGUAGES.filter((l) => !data.languages.includes(l))

  return (
    <WizardLayout
      step={2}
      quarters={1}
      stepLabel="Your experiences"
      title="What could you show someone?"
      subtitle="Describe your tour in one word. Not sure? Tap a suggestion."
      backTo="/apply/details"
      onNext={() => {
        setSubmitted(true)
        if (!errors.word && !errors.languages) navigate('/apply/experience')
      }}
    >
      <div className="flex w-full flex-col gap-4">
        <TextField
          label="Your tour in one word"
          required
          placeholder="e.g. Street-food"
          hint="One word travellers can search for."
          value={data.tourWord}
          error={submitted ? errors.word : ''}
          onChange={(tourWord) => update({ tourWord })}
        />
        <div className="flex flex-col gap-2">
          <p className="m-0 text-xs leading-[18px] font-medium text-text-secondary">Need inspiration? Try one of these</p>
          <div className="flex flex-wrap gap-2">
            {TOUR_SUGGESTIONS.map((s) => (
              <Chip key={s} selected={data.tourWord === s} onClick={() => update({ tourWord: s })}>
                {s}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <section className="flex w-full flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="m-0 text-lg leading-[26px] font-semibold text-text-primary">Languages you speak</h2>
          <p className="m-0 text-sm text-text-tertiary">Add every language you can guide in. Travellers often search by language.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.languages.map((l) => (
            <RemovableChip key={l} label={l} onRemove={() => update({ languages: data.languages.filter((x) => x !== l) })} />
          ))}
          {available.length > 0 && (
            <label className="relative flex cursor-pointer items-center rounded-full border border-border-subtle bg-bg-surface px-3 py-1.5 text-sm font-medium text-text-secondary">
              + Add language
              <select
                aria-label="Add language"
                value=""
                onChange={(e) => e.target.value && update({ languages: [...data.languages, e.target.value] })}
                className="absolute inset-0 size-full cursor-pointer opacity-0"
              >
                <option value="">Add language</option>
                {available.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
        {submitted && errors.languages && (
          <p role="alert" className="m-0 text-xs leading-[18px] text-danger">
            {errors.languages}
          </p>
        )}
      </section>
    </WizardLayout>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { WizardLayout } from '../layouts/WizardLayout'
import { useApplication } from '../state/application'

const MAX = 600
const MIN = 20

/** Step 2c — Tour story (Figma 16098:5155 / mobile 16098:5208). */
export default function TourStory() {
  const navigate = useNavigate()
  const { data, update } = useApplication()
  const [submitted, setSubmitted] = useState(false)
  const word = data.tourWord.trim().toLowerCase()
  const tooShort = data.tourStory.trim().length < MIN

  // No AI backend yet: "Write a draft for me" fills a simple editable template.
  const draft = () =>
    update({
      tourStory: `We’ll start with a relaxed walk through my favourite ${word || 'local'} spots in ${data.city || 'the city'}, stopping to taste, see and hear the stories behind each one, and finish with a view you won’t forget.`.slice(0, MAX),
    })

  return (
    <WizardLayout
      step={2}
      quarters={3}
      stepLabel="Your experiences"
      title={word ? `Describe your ${word} tour` : 'Describe your tour'}
      subtitle="What will guests do, see and experience with you? A few sentences is plenty."
      backTo="/apply/experience"
      onNext={() => {
        setSubmitted(true)
        if (!tooShort) navigate('/apply/rate')
      }}
    >
      <div className="flex w-full flex-col gap-3">
        <textarea
          aria-label="Tour story"
          aria-invalid={submitted && tooShort}
          maxLength={MAX}
          value={data.tourStory}
          onChange={(e) => update({ tourStory: e.target.value })}
          placeholder="e.g. We’ll start with breakfast suya at Balogun Market, wander the old Brazilian Quarter and end on a rooftop overlooking the lagoon…"
          className={`block min-h-[220px] w-full resize-none rounded-lg border bg-bg-surface p-4 text-base leading-6 text-text-primary outline-none placeholder:text-text-tertiary focus:border-brand-border ${
            submitted && tooShort ? 'border-danger' : 'border-border-strong'
          }`}
        />
        <div className="flex w-full items-center justify-between">
          <span className="text-xs leading-[18px] text-text-tertiary">{data.tourStory.length} / {MAX}</span>
          <Button variant="outline" size="small" onClick={draft}>
            ✨ Write a draft for me
          </Button>
        </div>
        {submitted && tooShort && (
          <p role="alert" className="m-0 text-xs leading-[18px] text-danger">
            Write at least a sentence ({MIN}+ characters).
          </p>
        )}
      </div>
    </WizardLayout>
  )
}

import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InfoCircleIcon } from '../components/icons/MiscIcons'
import { PhotoGrid } from '../components/PhotoGrid'
import { WizardLayout } from '../layouts/WizardLayout'
import { useApplication, type Photo } from '../state/application'

const REQUIRED = 4
const MAX_BYTES = 10 * 1024 * 1024

/** Step 3 — Photos (Figma 16086:6144 / mobile 16086:6215). Upload progress is simulated until there's an API. */
export default function Photos() {
  const navigate = useNavigate()
  const { attachments, setAttachments } = useApplication()
  const [submitted, setSubmitted] = useState(false)
  const [rejected, setRejected] = useState('')
  const timers = useRef<number[]>([])
  const photos = attachments.photos
  const ready = photos.filter((p) => p.progress === 100).length

  useEffect(() => () => timers.current.forEach(clearInterval), [])

  const add = (files: File[]) => {
    const tooBig = files.filter((f) => f.size > MAX_BYTES)
    setRejected(tooBig.length ? `${tooBig.map((f) => f.name).join(', ')} is larger than 10 MB.` : '')
    const added: Photo[] = files
      .filter((f) => f.size <= MAX_BYTES)
      .map((f) => ({ id: crypto.randomUUID(), url: URL.createObjectURL(f), name: f.name, progress: 0 }))
    if (!added.length) return
    setAttachments((a) => ({ ...a, photos: [...a.photos, ...added] }))
    added.forEach((p) => {
      const t = window.setInterval(() => {
        setAttachments((a) => ({ ...a, photos: a.photos.map((x) => (x.id === p.id ? { ...x, progress: Math.min(100, x.progress + 20) } : x)) }))
      }, 160)
      timers.current.push(t)
      window.setTimeout(() => clearInterval(t), 1000)
    })
  }
  const remove = (id: string) => setAttachments((a) => ({ ...a, photos: a.photos.filter((p) => p.id !== id) }))

  return (
    <WizardLayout
      step={3}
      quarters={4}
      stepLabel="Photos"
      title="Add photos of your tours"
      subtitle="Add 4–6. Show you, your guests and the places you go — phone photos are fine."
      backTo="/apply/rate"
      onNext={() => {
        setSubmitted(true)
        if (ready >= REQUIRED && ready === photos.length) navigate('/apply/id')
      }}
    >
      <PhotoGrid photos={photos} onAdd={add} onRemove={remove} />
      <div className="flex w-full items-start gap-2 text-text-tertiary">
        <InfoCircleIcon className="mt-px size-4 shrink-0" />
        <p className={`m-0 min-w-px flex-1 text-sm leading-[18px] ${submitted && ready < REQUIRED ? 'text-danger' : ''}`}>
          {ready < REQUIRED ? `${ready} of ${REQUIRED} required` : `${ready} photos added`} · JPG or PNG, up to 10 MB each · drag to reorder
        </p>
      </div>
      {rejected && (
        <p role="alert" className="m-0 text-xs leading-[18px] text-danger">
          {rejected}
        </p>
      )}
    </WizardLayout>
  )
}

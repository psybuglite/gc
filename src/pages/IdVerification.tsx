import { useId, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DateField, parseDate } from '../components/DateField'
import { Field, controlBox, controlShell } from '../components/Field'
import { LockIcon } from '../components/icons/MiscIcons'
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon'
import { TextField } from '../components/TextField'
import { UploadBox } from '../components/UploadBox'
import { WizardLayout } from '../layouts/WizardLayout'
import { useApplication, type ApplicationData } from '../state/application'

export const ID_TYPES: { id: ApplicationData['idType']; label: string }[] = [
  { id: 'passport', label: 'Passport' },
  { id: 'drivers-licence', label: 'Driver’s licence' },
  { id: 'national-id', label: 'National ID' },
]

const MAX_BYTES = 10 * 1024 * 1024

/** Step 4 — ID verification (Figma 16086:6280 / mobile 16086:6408). */
export default function IdVerification() {
  const navigate = useNavigate()
  const { data, update, attachments, setAttachments } = useApplication()
  const [submitted, setSubmitted] = useState(false)
  const [fileError, setFileError] = useState('')
  const typeId = useId()

  const today = new Date()
  const issue = parseDate(data.idIssue)
  const expiry = parseDate(data.idExpiry)
  const errors = {
    idNumber: data.idNumber.trim().length >= 5 ? '' : 'Enter the number exactly as shown on your ID',
    idIssue: !issue ? 'Enter a date as DD / MM / YYYY' : issue > today ? 'Issue date can’t be in the future' : '',
    idExpiry: !expiry ? 'Enter a date as DD / MM / YYYY' : expiry <= today ? 'This ID has expired' : issue && expiry <= issue ? 'Must be after the issue date' : '',
    doc: attachments.idDoc ? '' : 'Upload a photo of your ID',
  }
  const valid = Object.values(errors).every((e) => !e)
  const show = <K extends keyof typeof errors>(k: K) => (submitted ? errors[k] : '')
  const typeLabel = ID_TYPES.find((t) => t.id === data.idType)!.label

  return (
    <WizardLayout
      step={4}
      quarters={4}
      stepLabel="ID verification"
      title="Verify your identity"
      subtitle="Checked after you submit, usually within 24–48 hours."
      backTo="/apply/photos"
      onNext={() => {
        setSubmitted(true)
        if (valid) navigate('/apply/references')
      }}
    >
      <Field label="Which ID will you use?" required htmlFor={typeId} className="w-full">
        <div className={`relative ${controlShell}`}>
          <div className={controlBox()}>
            <span className="min-w-px flex-1 text-sm leading-[18px] font-medium text-text-primary">{typeLabel}</span>
            <ChevronDownIcon className="size-6 text-text-secondary opacity-80" />
          </div>
          <select
            id={typeId}
            value={data.idType}
            onChange={(e) => update({ idType: e.target.value as ApplicationData['idType'] })}
            className="absolute inset-0 size-full cursor-pointer opacity-0"
          >
            {ID_TYPES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </Field>

      <TextField
        label="ID number"
        required
        placeholder="As shown on your ID"
        autoComplete="off"
        value={data.idNumber}
        error={show('idNumber')}
        onChange={(idNumber) => update({ idNumber })}
      />

      <div className="flex w-full flex-col gap-4 md:flex-row">
        <DateField className="md:min-w-40 md:flex-1" label="Issue date" required value={data.idIssue} error={show('idIssue')} onChange={(idIssue) => update({ idIssue })} />
        <DateField className="md:min-w-40 md:flex-1" label="Expiry date" required value={data.idExpiry} error={show('idExpiry')} onChange={(idExpiry) => update({ idExpiry })} />
      </div>

      <div className="flex w-full flex-col gap-2">
        <UploadBox
          className="rounded-2xl"
          title={attachments.idDoc ? attachments.idDoc.name : 'Upload a photo of your ID'}
          hint="JPG, PNG or PDF · max 10 MB · all corners visible"
          onFileSelected={(f) => {
            if (f.size > MAX_BYTES) {
              setFileError('File is larger than 10 MB.')
              return
            }
            setFileError('')
            setAttachments((a) => ({ ...a, idDoc: f }))
          }}
        />
        {(fileError || show('doc')) && (
          <p role="alert" className="m-0 text-xs leading-[18px] text-danger">
            {fileError || show('doc')}
          </p>
        )}
      </div>

      <div className="flex w-full items-start gap-2 text-text-tertiary">
        <LockIcon className="mt-px size-4 shrink-0" />
        <p className="m-0 min-w-px flex-1 text-sm leading-[18px]">Encrypted, stored securely and never shown to travellers</p>
      </div>
    </WizardLayout>
  )
}

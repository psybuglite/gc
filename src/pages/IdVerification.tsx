import { useId, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Banner } from '../components/Banner'
import { DateField, parseDate } from '../components/DateField'
import { Field, controlBox, controlShell } from '../components/Field'
import { LockIcon } from '../components/icons/MiscIcons'
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon'
import { TextField } from '../components/TextField'
import { IdTypePicker } from '../components/overlays/IdTypePicker'
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
  const [params] = useSearchParams()
  const resubmit = params.get('resubmit') === '1'
  const showDates = !resubmit || !(data.idIssue && data.idExpiry)
  const typeId = useId()
  const [typeOpen, setTypeOpen] = useState(false)

  const today = new Date()
  const issue = parseDate(data.idIssue)
  const expiry = parseDate(data.idExpiry)
  const errors = {
    idNumber: data.idNumber.trim().length >= 5 ? '' : 'Enter the number exactly as shown on your ID',
    idIssue: !issue ? 'Enter a date as DD / MM / YYYY' : issue > today ? 'Issue date can’t be in the future' : '',
    idExpiry: !expiry ? 'Enter a date as DD / MM / YYYY' : expiry <= today ? 'This ID has expired' : issue && expiry <= issue ? 'Must be after the issue date' : '',
    doc: attachments.idDoc ? '' : 'Upload a photo of your ID',
  }
  const valid = Object.entries(errors).every(([k, e]) => !e || (!showDates && (k === 'idIssue' || k === 'idExpiry')))
  const show = <K extends keyof typeof errors>(k: K) => (submitted ? errors[k] : '')
  const typeLabel = ID_TYPES.find((t) => t.id === data.idType)!.label
  const typeLower = typeLabel.toLowerCase()

  return (
    <WizardLayout
      step={4}
      quarters={4}
      stepLabel="ID verification"
      title={resubmit ? `Replace your ${typeLower} photo` : 'Verify your identity'}
      subtitle={resubmit ? 'Your other ID details are saved.' : 'Checked after you submit, usually within 24–48 hours.'}
      banner={resubmit && <Banner tone="warning" title={`Your ${typeLower} photo is blurry`}>Upload a sharper photo with all four corners visible.</Banner>}
      backTo={resubmit ? '/apply/status/changes' : '/apply/photos'}
      onNext={() => {
        setSubmitted(true)
        if (valid) navigate(resubmit ? '/apply/references?resubmit=1' : '/apply/references')
      }}
    >
      <Field label="Which ID will you use?" required htmlFor={typeId} className="w-full">
        <div className={controlShell()}>
          <button id={typeId} type="button" aria-haspopup="dialog" onClick={() => setTypeOpen(true)} className={`${controlBox()} cursor-pointer text-left`}>
            <span className="min-w-px flex-1 text-sm font-medium text-text-primary">{typeLabel}</span>
            <ChevronDownIcon className="size-6 text-text-secondary opacity-80" />
          </button>
        </div>
        <IdTypePicker open={typeOpen} onClose={() => setTypeOpen(false)} value={data.idType} onSelect={(idType) => update({ idType })} />
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

      {showDates && (
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <DateField className="md:min-w-40 md:flex-1" label="Issue date" required years={{ from: -30, to: 0, start: -3 }} value={data.idIssue} error={show('idIssue')} onChange={(idIssue) => update({ idIssue })} />
        <DateField className="md:min-w-40 md:flex-1" label="Expiry date" required years={{ from: 0, to: 25, start: 5 }} value={data.idExpiry} error={show('idExpiry')} onChange={(idExpiry) => update({ idExpiry })} />
      </div>
      )}

      <div className="flex w-full flex-col gap-2">
        <UploadBox
          className="rounded-2xl"
          tone={resubmit ? 'warning' : 'default'}
          title={attachments.idDoc ? attachments.idDoc.name : resubmit ? `Upload a new ${typeLower} photo` : 'Upload a photo of your ID'}
          hint={resubmit ? 'Previous photo was blurry · JPG, PNG or PDF · max 10 MB' : 'JPG, PNG or PDF · max 10 MB · all corners visible'}
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
          <p role="alert" className="m-0 text-xs leading-[18px] font-medium text-error">
            {fileError || show('doc')}
          </p>
        )}
      </div>

      <div className="flex w-full items-start gap-2 text-text-tertiary">
        <LockIcon className="mt-px size-4 shrink-0" />
        <p className="m-0 min-w-px flex-1 text-sm">Encrypted, stored securely and never shown to travellers</p>
      </div>
    </WizardLayout>
  )
}

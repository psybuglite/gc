import { useState } from 'react'
import { Button } from '../components/Button'
import { Chip } from '../components/Chip'
import { ShieldTickIcon } from '../components/icons/ShieldTickIcon'
import { UploadBox } from '../components/UploadBox'

const ID_TYPES = [
  { id: 'passport', label: 'Passport', uploadTitle: 'Upload photo page of your passport' },
  { id: 'drivers-licence', label: 'Driver’s licence', uploadTitle: 'Upload front of your driver’s licence' },
  { id: 'national-id', label: 'National ID', uploadTitle: 'Upload front of your national ID' },
] as const

const MAX_BYTES = 10 * 1024 * 1024

export default function VerifyIdentity() {
  const [idType, setIdType] = useState<(typeof ID_TYPES)[number]['id']>('passport')
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const selected = ID_TYPES.find((t) => t.id === idType)!

  const handleFile = (f: File) => {
    if (f.size > MAX_BYTES) {
      setFile(null)
      setError('File is larger than 10 MB.')
      return
    }
    setError(null)
    setFile(f)
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-10 pt-14 pb-10">
      <div className="flex w-full max-w-[480px] flex-col items-start gap-5">
        <h1 className="m-0 w-full text-[40px] leading-[48px] font-semibold tracking-[-0.6px] text-text-primary">
          Verify your identity
        </h1>
        <p className="m-0 w-full text-base leading-6 text-text-secondary">
          Guides only accept verified travellers. It takes about 2 minutes and your ID is never shown to guides.
        </p>

        <div className="flex w-full flex-wrap items-start gap-2" role="group" aria-label="ID type">
          {ID_TYPES.map((t) => (
            <Chip
              key={t.id}
              selected={t.id === idType}
              onClick={() => {
                setIdType(t.id)
                setFile(null)
                setError(null)
              }}
            >
              {t.label}
            </Chip>
          ))}
        </div>

        <div className="flex w-full flex-col gap-2">
          <UploadBox title={file ? file.name : selected.uploadTitle} onFileSelected={handleFile} />
          {error && (
            <p role="alert" className="m-0 text-sm leading-[18px] text-brand-text">
              {error}
            </p>
          )}
        </div>

        <div className="flex w-full items-start gap-2.5 overflow-clip rounded-xl bg-info-bg px-3.5 py-3 text-info-text">
          <ShieldTickIcon className="size-[18px] shrink-0" />
          <p className="m-0 min-w-px flex-1 text-sm leading-[18px]">
            We check your ID with our verification partner and only show guides a “Verified” badge.
          </p>
        </div>

        <Button
          fullWidth
          onClick={() => {
            if (!file) setError('Please upload your ID before continuing.')
          }}
        >
          Submit and send request
        </Button>
      </div>
    </main>
  )
}

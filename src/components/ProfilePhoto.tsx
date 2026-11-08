import { useEffect, useRef, useState } from 'react'
import { Button } from './Button'
import { CameraPlusIcon } from './icons/CameraPlusIcon'

type ProfilePhotoProps = {
  onChange?: (file: File | null) => void
}

/** UI/Profile Photo — empty state with upload prompt; shows a round preview once a photo is chosen. */
export function ProfilePhoto({ onChange }: ProfilePhotoProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview) }, [preview])

  return (
    <div className="flex w-full items-center gap-5">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        aria-label={preview ? 'Change profile photo' : 'Add a profile photo'}
        className="flex size-28 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border-[1.5px] border-dashed border-border-strong bg-bg-surface-muted text-text-secondary"
      >
        {preview ? <img src={preview} alt="" className="size-full object-cover" /> : <CameraPlusIcon className="size-7" />}
      </button>
      <div className="flex min-w-px flex-1 flex-col items-start gap-1">
        <p className="m-0 text-base leading-[18px] font-semibold text-text-primary">Add a profile photo</p>
        <p className="m-0 text-sm leading-[18px] text-text-secondary">A clear, smiling photo of your face works best.</p>
        <Button variant="outline" size="small" className="mt-1" onClick={() => inputRef.current?.click()}>
          {preview ? 'Change photo' : 'Upload photo'}
        </Button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null
          setPreview(file ? URL.createObjectURL(file) : null)
          onChange?.(file)
        }}
      />
    </div>
  )
}

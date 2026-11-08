import { useRef } from 'react'
import { UploadCloudIcon } from './icons/UploadCloudIcon'

type UploadBoxProps = {
  title: string
  hint?: string
  className?: string
  onFileSelected?: (file: File) => void
}

export function UploadBox({ title, hint = 'JPG, PNG or PDF · max 10 MB', className = 'rounded-lg', onFileSelected }: UploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={`flex w-full cursor-pointer items-center gap-4 ${className} border-[1.5px] border-dashed border-border-strong bg-bg-surface-muted px-5 py-4`}
      >
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-bg-surface text-text-primary">
          <UploadCloudIcon className="size-6" />
        </span>
        <span className="flex min-w-px flex-1 flex-col gap-0.5 text-left leading-[18px]">
          <span className="text-sm font-semibold text-brand-text">{title}</span>
          <span className="text-xs text-text-tertiary">{hint}</span>
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,application/pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onFileSelected?.(file)
        }}
      />
    </>
  )
}

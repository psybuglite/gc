import { CloseIcon } from './icons/CloseIcon'

type RemovableChipProps = {
  label: string
  onRemove: () => void
}

/** UI/Removable Chip — selected tag with an inline remove button. */
export function RemovableChip({ label, onRemove }: RemovableChipProps) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-brand-primary bg-brand-subtle py-2 pr-2 pl-3.5 text-sm font-medium whitespace-nowrap text-brand-text">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label}`}
        className="flex size-5 cursor-pointer items-center justify-center rounded-full"
      >
        <CloseIcon className="size-3.5" />
      </button>
    </span>
  )
}

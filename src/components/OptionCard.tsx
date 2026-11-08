type OptionCardProps = {
  title: string
  description: string
  selected: boolean
  onSelect: () => void
}

/** UI/Option Card — radio-style card. Selected: brand tint + 2px brand border + filled radio. */
export function OptionCard({ title, description, selected, onSelect }: OptionCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`flex w-full cursor-pointer items-center gap-4 rounded-xl p-4 text-left ${
        selected ? 'border-2 border-brand-primary bg-brand-subtle' : 'border border-border-subtle bg-bg-surface'
      }`}
    >
      <span className="flex min-w-px flex-1 flex-col gap-1 leading-[18px]">
        <span className="text-base leading-[18px] font-semibold text-text-primary">{title}</span>
        <span className="text-sm leading-[18px] text-text-secondary">{description}</span>
      </span>
      {selected ? (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="shrink-0">
          <circle cx="11" cy="11" r="10" fill="white" stroke="#EB6223" strokeWidth="2" />
          <circle cx="11" cy="11" r="6" fill="#EB6223" />
        </svg>
      ) : (
        <span className="size-[22px] shrink-0 rounded-full border-[1.5px] border-border-strong bg-bg-surface" />
      )}
    </button>
  )
}

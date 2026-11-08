import { UiIcon } from '../icons/UiIcon'

type SearchBoxProps = { value: string; onChange: (v: string) => void; placeholder: string; iconSide?: 'left' | 'right' }

export function SearchBox({ value, onChange, placeholder, iconSide = 'left' }: SearchBoxProps) {
  const icon = <UiIcon name="search-lg" size={20} className="shrink-0 text-text-secondary" />
  return (
    <div className="flex h-[52px] w-full items-center gap-3 rounded-[8px] border border-[#b0b0b0] bg-white px-4 focus-within:outline-2 focus-within:outline-brand-border">
      {iconSide === 'left' && icon}
      <input
        type="search"
        aria-label={placeholder}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-px flex-1 bg-transparent text-sm leading-5 font-medium text-text-primary outline-none placeholder:text-[#3d3d3d]/70 [&::-webkit-search-cancel-button]:hidden"
      />
      {iconSide === 'right' && icon}
    </div>
  )
}

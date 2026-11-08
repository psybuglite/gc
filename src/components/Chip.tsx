import type { ButtonHTMLAttributes } from 'react'

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean }

export function Chip({ selected = false, children, ...rest }: ChipProps) {
  const state = selected
    ? 'border-brand-border bg-brand-subtle text-brand-text'
    : 'border-border-subtle bg-bg-surface text-text-secondary'
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={`flex shrink-0 cursor-pointer items-center gap-1 rounded-full border px-3 py-1.5 text-left text-sm font-medium whitespace-nowrap ${state}`}
      {...rest}
    >
      {children}
    </button>
  )
}

import type { ReactNode } from 'react'
import { CheckIcon } from './icons/CheckIcon'

type CheckboxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  children: ReactNode
}

/** UI/Checkbox — 20px box, brand fill with white tick when checked. */
export function Checkbox({ checked, onChange, children }: CheckboxProps) {
  return (
    <label className="flex w-full cursor-pointer items-center gap-3">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
      <span
        className={`flex size-5 shrink-0 items-center justify-center rounded-xs peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-primary ${
          checked ? 'bg-brand-primary text-white' : 'border-[1.5px] border-border-strong bg-bg-surface'
        }`}
      >
        {checked && <CheckIcon className="size-3.5" />}
      </span>
      <span className="min-w-px flex-1 text-sm leading-[18px] font-medium text-text-primary">{children}</span>
    </label>
  )
}

import { useId, useState } from 'react'
import { CalendarIcon } from './icons/CalendarIcon'
import { Field, controlBox, controlShell } from './Field'
import { DatePicker } from './overlays/DatePicker'

type DateFieldProps = {
  label: string
  required?: boolean
  /** Display value, "DD / MM / YYYY". */
  value: string
  hint?: string
  error?: string
  className?: string
  /** Year range offered by the picker, relative to this year (e.g. -100 … -18 for date of birth). */
  years?: { from: number; to: number; start: number }
  onChange: (value: string) => void
}

/** Formats raw digits as "DD / MM / YYYY". */
export function formatDate(raw: string) {
  const d = raw.replace(/\D/g, '').slice(0, 8)
  const parts = [d.slice(0, 2), d.slice(2, 4), d.slice(4, 8)].filter(Boolean)
  return parts.join(' / ')
}

/** Parses "DD / MM / YYYY" into a real Date, or null when incomplete / impossible. */
export function parseDate(value: string): Date | null {
  const m = value.match(/^(\d{2}) \/ (\d{2}) \/ (\d{4})$/)
  if (!m) return null
  const [day, month, year] = [Number(m[1]), Number(m[2]), Number(m[3])]
  const date = new Date(year, month - 1, day)
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? date : null
}

/** Date text field with calendar button (opens the browser's date picker). */
export function DateField({ label, required, value, hint, error, className, years = { from: -100, to: 0, start: -30 }, onChange }: DateFieldProps) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const now = new Date().getFullYear()
  return (
    <Field label={label} required={required} htmlFor={id} hint={hint} error={error} className={className}>
      <div className={controlShell(error)}>
        <div className={controlBox(error)}>
          <input
            id={id}
            inputMode="numeric"
            autoComplete="bday"
            placeholder="DD / MM / YYYY"
            value={value}
            onChange={(e) => onChange(formatDate(e.target.value))}
            className="min-w-px flex-1 bg-transparent text-sm font-medium text-text-primary outline-none placeholder:text-[#3d3d3d]/50"
          />
          <button type="button" aria-label="Open calendar" aria-haspopup="dialog" onClick={() => setOpen(true)} className="flex cursor-pointer text-text-primary opacity-80">
            <CalendarIcon className="size-6" />
          </button>
        </div>
      </div>
      <DatePicker open={open} onClose={() => setOpen(false)} title={label} value={value} minYear={now + years.from} maxYear={now + years.to} defaultYear={now + years.start} onConfirm={onChange} />
    </Field>
  )
}

import { useId, useRef } from 'react'
import { CalendarIcon } from './icons/CalendarIcon'
import { Field, controlBox, controlShell } from './Field'

type DateFieldProps = {
  label: string
  required?: boolean
  /** Display value, "DD / MM / YYYY". */
  value: string
  hint?: string
  error?: string
  className?: string
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
export function DateField({ label, required, value, hint, error, className, onChange }: DateFieldProps) {
  const id = useId()
  const picker = useRef<HTMLInputElement>(null)
  return (
    <Field label={label} required={required} htmlFor={id} hint={hint} error={error} className={className}>
      <div className={controlShell}>
        <div className={controlBox(error)}>
          <input
            id={id}
            inputMode="numeric"
            autoComplete="bday"
            placeholder="DD / MM / YYYY"
            value={value}
            onChange={(e) => onChange(formatDate(e.target.value))}
            className="min-w-px flex-1 bg-transparent text-sm leading-[18px] font-medium text-text-primary outline-none placeholder:text-[#3d3d3d]/50"
          />
          <button
            type="button"
            aria-label="Open calendar"
            onClick={() => picker.current?.showPicker?.()}
            className="relative flex cursor-pointer text-text-primary opacity-80"
          >
            <CalendarIcon className="size-6" />
            <input
              ref={picker}
              type="date"
              tabIndex={-1}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 size-full opacity-0"
              onChange={(e) => {
                const [y, mo, d] = e.target.value.split('-')
                if (y) onChange(`${d} / ${mo} / ${y}`)
              }}
            />
          </button>
        </div>
      </div>
    </Field>
  )
}

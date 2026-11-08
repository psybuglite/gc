import { useId } from 'react'
import { COUNTRIES, flagEmoji, findCountry } from '../data/countries'
import { ChevronDownIcon } from './icons/ChevronDownIcon'
import { Field, controlBox, controlShell } from './Field'

type CountrySelectProps = {
  label: string
  required?: boolean
  value: string
  error?: string
  className?: string
  onChange: (code: string) => void
}

/** UI/Country Select — flag + name with a chevron. Uses a native <select> overlay for now. */
export function CountrySelect({ label, required, value, error, className, onChange }: CountrySelectProps) {
  const id = useId()
  const country = findCountry(value)
  return (
    <Field label={label} required={required} htmlFor={id} error={error} className={className}>
      <div className={`relative ${controlShell}`}>
        <div className={controlBox(error)}>
          <span className="text-xl leading-none">{flagEmoji(country.code)}</span>
          <span className="min-w-px flex-1 text-sm font-medium text-text-primary">{country.name}</span>
          <ChevronDownIcon className="size-6 text-text-primary" />
        </div>
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 size-full cursor-pointer opacity-0"
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {flagEmoji(c.code)} {c.name}
            </option>
          ))}
        </select>
      </div>
    </Field>
  )
}

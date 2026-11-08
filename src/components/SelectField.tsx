import { useId, useState } from 'react'
import { flagEmoji, findCountry } from '../data/countries'
import { ChevronDownIcon } from './icons/ChevronDownIcon'
import { Field, controlBox, controlShell } from './Field'
import { CountryPicker } from './overlays/CountryPicker'

type CountrySelectProps = {
  label: string
  required?: boolean
  value: string
  error?: string
  className?: string
  onChange: (code: string) => void
}

/** UI/Country Select — flag + name with a chevron; opens the country picker. */
export function CountrySelect({ label, required, value, error, className, onChange }: CountrySelectProps) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const country = findCountry(value)
  return (
    <Field label={label} required={required} htmlFor={id} error={error} className={className}>
      <div className={controlShell(error)}>
        <button id={id} type="button" aria-haspopup="dialog" onClick={() => setOpen(true)} className={`${controlBox(error)} cursor-pointer text-left`}>
          <span className="text-xl leading-none">{flagEmoji(country.code)}</span>
          <span className="min-w-px flex-1 text-sm font-medium text-text-primary">{country.name}</span>
          <ChevronDownIcon className="size-6 text-text-primary" />
        </button>
      </div>
      <CountryPicker open={open} onClose={() => setOpen(false)} value={value} onSelect={onChange} />
    </Field>
  )
}

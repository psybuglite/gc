import { useId, useState } from 'react'
import { flagEmoji, findCountry } from '../data/countries'
import { ChevronDownIcon } from './icons/ChevronDownIcon'
import { Field, controlBox, controlShell } from './Field'
import { CountryPicker } from './overlays/CountryPicker'

type PhoneFieldProps = {
  label?: string
  required?: boolean
  countryCode: string
  number: string
  error?: string
  onCountryChange: (code: string) => void
  onNumberChange: (value: string) => void
}

/** UI/Phone Field — country calling code selector, divider, number input. */
export function PhoneField({ label = 'Phone number', required, countryCode, number, error, onCountryChange, onNumberChange }: PhoneFieldProps) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const country = findCountry(countryCode)
  return (
    <Field label={label} required={required} htmlFor={id} error={error} className="w-full">
      <div className={controlShell(error)}>
        <div className={controlBox(error)}>
          <button type="button" aria-haspopup="dialog" aria-label="Country calling code" onClick={() => setOpen(true)} className="flex cursor-pointer items-center gap-1.5">
            <span className="text-xl leading-none">{flagEmoji(country.code)}</span>
            <span className="text-sm font-medium text-text-primary">{country.dial}</span>
            <ChevronDownIcon className="size-4 text-text-primary" />
          </button>
          <span className="h-6 w-px shrink-0 bg-[#b0b0b0]" aria-hidden="true" />
          <input
            id={id}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="800 000 0000"
            value={number}
            onChange={(e) => onNumberChange(e.target.value.replace(/[^\d\s]/g, ''))}
            className="min-w-px flex-1 bg-transparent text-sm font-medium text-[#3d3d3d] outline-none placeholder:text-[#3d3d3d]/50"
          />
        </div>
      </div>
      <CountryPicker open={open} onClose={() => setOpen(false)} value={countryCode} onSelect={onCountryChange} mode="dial" />
    </Field>
  )
}

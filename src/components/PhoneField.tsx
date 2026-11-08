import { useId } from 'react'
import { COUNTRIES, flagEmoji, findCountry } from '../data/countries'
import { ChevronDownIcon } from './icons/ChevronDownIcon'
import { Field, controlBox, controlShell } from './Field'

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
  const country = findCountry(countryCode)
  return (
    <Field label={label} required={required} htmlFor={id} error={error} className="w-full">
      <div className={controlShell}>
        <div className={controlBox(error)}>
          <label className="relative flex cursor-pointer items-center gap-1.5">
            <span className="text-xl leading-none">{flagEmoji(country.code)}</span>
            <span className="text-sm font-medium text-text-primary">{country.dial}</span>
            <ChevronDownIcon className="size-4 text-text-primary" />
            <select
              aria-label="Country calling code"
              value={countryCode}
              onChange={(e) => onCountryChange(e.target.value)}
              className="absolute inset-0 size-full cursor-pointer opacity-0"
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {flagEmoji(c.code)} {c.name} ({c.dial})
                </option>
              ))}
            </select>
          </label>
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
    </Field>
  )
}

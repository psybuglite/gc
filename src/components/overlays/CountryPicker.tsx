import { useMemo, useState } from 'react'
import { COUNTRIES, flagEmoji } from '../../data/countries'
import { UiIcon } from '../icons/UiIcon'
import { Overlay } from './Overlay'
import { SearchBox } from './SearchBox'

type CountryPickerProps = {
  open: boolean
  onClose: () => void
  value: string
  onSelect: (code: string) => void
  /** "dial" shows calling codes and a "Select country code" title. */
  mode?: 'country' | 'dial'
}

/** UI/Country Picker — searchable country list (modal on desktop, sheet on mobile). */
export function CountryPicker({ open, onClose, value, onSelect, mode = 'country' }: CountryPickerProps) {
  const [query, setQuery] = useState('')
  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? COUNTRIES.filter((c) => c.name.toLowerCase().includes(q) || c.dial.includes(q) || c.code.toLowerCase() === q) : COUNTRIES
  }, [query])
  const close = () => {
    setQuery('')
    onClose()
  }
  return (
    <Overlay open={open} onClose={close} title={mode === 'dial' ? 'Select country code' : 'Select your country'}>
      <SearchBox value={query} onChange={setQuery} placeholder="Search countries" />
      <ul className="m-0 flex max-h-[416px] min-h-0 list-none flex-col overflow-y-auto p-0" role="listbox" aria-label="Countries">
        {list.map((c) => {
          const selected = c.code === value
          return (
            <li key={c.code} role="option" aria-selected={selected}>
              <button
                type="button"
                onClick={() => {
                  onSelect(c.code)
                  close()
                }}
                className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-2 py-3.5 text-left ${selected ? 'bg-brand-subtle' : ''}`}
              >
                <span className="text-[22px] leading-none">{flagEmoji(c.code)}</span>
                <span className="min-w-px flex-1 text-base leading-6 font-medium text-text-primary">{c.name}</span>
                {mode === 'dial' && <span className="text-sm leading-5 text-text-tertiary">{c.dial}</span>}
                {selected && <UiIcon name="check" size={20} className="text-brand-text" />}
              </button>
            </li>
          )
        })}
        {list.length === 0 && <li className="px-2 py-6 text-center text-sm leading-5 text-text-tertiary">No countries match “{query}”.</li>}
      </ul>
    </Overlay>
  )
}

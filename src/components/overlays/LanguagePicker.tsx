import { useEffect, useMemo, useState } from 'react'
import { LANGUAGES } from '../../data/languages'
import { Button } from '../Button'
import { UiIcon } from '../icons/UiIcon'
import { Overlay } from './Overlay'
import { SearchBox } from './SearchBox'

/** Language picker — multi-select with search; changes apply when you press Done. */
export function LanguagePicker({ open, onClose, value, onConfirm }: { open: boolean; onClose: () => void; value: string[]; onConfirm: (v: string[]) => void }) {
  const [draft, setDraft] = useState(value)
  const [query, setQuery] = useState('')
  useEffect(() => {
    if (open) {
      setDraft(value)
      setQuery('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])
  const list = useMemo(() => LANGUAGES.filter((l) => l.toLowerCase().includes(query.trim().toLowerCase())), [query])
  const toggle = (l: string) => setDraft((d) => (d.includes(l) ? d.filter((x) => x !== l) : [...d, l]))

  return (
    <Overlay open={open} onClose={onClose} title="Languages you speak" subtitle="Choose all that apply">
      <SearchBox value={query} onChange={setQuery} placeholder="Search languages" iconSide="right" />
      <ul className="m-0 flex max-h-[560px] min-h-0 list-none flex-col overflow-y-auto p-0" aria-label="Languages">
        {list.map((l) => {
          const on = draft.includes(l)
          return (
            <li key={l} className="border-b border-border-subtle">
              <button type="button" role="checkbox" aria-checked={on} onClick={() => toggle(l)} className="flex w-full cursor-pointer items-center gap-3 px-1 py-3.5 text-left">
                <span className="min-w-px flex-1 text-base leading-6 font-medium text-text-primary">{l}</span>
                <span className={`flex size-[22px] shrink-0 items-center justify-center rounded-[6px] ${on ? 'bg-brand-primary text-white' : 'border-[1.5px] border-border-strong bg-bg-surface'}`}>
                  {on && <UiIcon name="check" size={14} />}
                </span>
              </button>
            </li>
          )
        })}
        {list.length === 0 && <li className="px-1 py-6 text-center text-sm leading-5 text-text-tertiary">No languages match “{query}”.</li>}
      </ul>
      <Button
        fullWidth
        onClick={() => {
          onConfirm(LANGUAGES.filter((l) => draft.includes(l)).concat(draft.filter((l) => !LANGUAGES.includes(l))))
          onClose()
        }}
      >
        Done
      </Button>
    </Overlay>
  )
}

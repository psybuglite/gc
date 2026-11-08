import { UiIcon } from '../icons/UiIcon'
import { Overlay } from './Overlay'

type ListPickerProps = {
  open: boolean
  onClose: () => void
  title: string
  options: readonly string[]
  value: string
  onSelect: (v: string) => void
}

/** UI/List Picker — single-choice list. */
export function ListPicker({ open, onClose, title, options, value, onSelect }: ListPickerProps) {
  return (
    <Overlay open={open} onClose={onClose} title={title}>
      <ul className="m-0 flex list-none flex-col gap-1 p-0" role="listbox" aria-label={title}>
        {options.map((o) => {
          const selected = o === value
          return (
            <li key={o} role="option" aria-selected={selected}>
              <button
                type="button"
                onClick={() => {
                  onSelect(o)
                  onClose()
                }}
                className={`flex w-full cursor-pointer items-center rounded-xl px-3 py-3.5 text-left text-base leading-6 font-medium text-text-primary ${selected ? 'bg-brand-subtle' : ''}`}
              >
                <span className="min-w-px flex-1">{o}</span>
                {selected && <UiIcon name="check" size={20} className="text-brand-text" />}
              </button>
            </li>
          )
        })}
      </ul>
    </Overlay>
  )
}

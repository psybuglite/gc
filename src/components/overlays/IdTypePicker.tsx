import { UiIcon, type UiIconName } from '../icons/UiIcon'
import type { ApplicationData } from '../../state/application'
import { Overlay } from './Overlay'

type IdType = ApplicationData['idType']

export const ID_TYPE_OPTIONS: { id: IdType; label: string; hint: string; icon: UiIconName }[] = [
  { id: 'passport', label: 'Passport', hint: 'Upload the photo page', icon: 'passport' },
  { id: 'drivers-licence', label: 'Driver’s licence', hint: 'Upload the front and back', icon: 'credit-card-01' },
  { id: 'national-id', label: 'National ID card', hint: 'NIN slip or card — front and back', icon: 'user-square' },
]

/** Guide/ID Type Picker — option cards with icon, hint and a tick on the chosen one. */
export function IdTypePicker({ open, onClose, value, onSelect }: { open: boolean; onClose: () => void; value: IdType; onSelect: (v: IdType) => void }) {
  return (
    <Overlay open={open} onClose={onClose} title="Which ID will you use?">
      <div role="radiogroup" aria-label="ID type" className="flex flex-col gap-2">
        {ID_TYPE_OPTIONS.map((o) => {
          const selected = o.id === value
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => {
                onSelect(o.id)
                onClose()
              }}
              className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3.5 text-left ${selected ? 'border-2 border-brand-primary bg-brand-subtle' : 'border border-border-subtle bg-bg-surface'}`}
            >
              <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${selected ? 'bg-bg-surface text-brand-text' : 'bg-bg-surface-muted text-text-primary'}`}>
                <UiIcon name={o.icon} size={20} />
              </span>
              <span className="flex min-w-px flex-1 flex-col gap-0.5">
                <span className="text-base leading-6 font-semibold text-text-primary">{o.label}</span>
                <span className="text-sm leading-5 text-text-secondary">{o.hint}</span>
              </span>
              {selected && <UiIcon name="check" size={20} className="text-brand-text" />}
            </button>
          )
        })}
      </div>
    </Overlay>
  )
}

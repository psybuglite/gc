import { useEffect, useRef, useState } from 'react'
import { Button } from '../Button'
import { Overlay } from './Overlay'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const pad = (n: number) => String(n).padStart(2, '0')
const daysIn = (m: number, y: number) => new Date(y, m, 0).getDate()

type WheelProps<T> = { label: string; values: T[]; value: T; format: (v: T) => string; onChange: (v: T) => void }

/** One scroll wheel showing five rows around the selection. Mouse wheel, arrow keys, swipe and tapping a row all move it. */
function Wheel<T>({ label, values, value, format, onChange }: WheelProps<T>) {
  const i = Math.max(0, values.indexOf(value))
  const move = (by: number) => onChange(values[Math.min(values.length - 1, Math.max(0, i + by))])
  const drag = useRef<{ y: number; i: number } | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  // Non-passive wheel listener so the page behind never scrolls while spinning the wheel.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const h = (e: WheelEvent) => {
      e.preventDefault()
      if (Math.abs(e.deltaY) > 4) move(e.deltaY > 0 ? 1 : -1)
    }
    el.addEventListener('wheel', h, { passive: false })
    return () => el.removeEventListener('wheel', h)
  })

  return (
    <div
      ref={ref}
      role="listbox"
      aria-label={label}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowDown') (e.preventDefault(), move(1))
        if (e.key === 'ArrowUp') (e.preventDefault(), move(-1))
      }}
      onPointerDown={(e) => (drag.current = { y: e.clientY, i })}
      onPointerMove={(e) => {
        if (!drag.current) return
        const by = Math.round((drag.current.y - e.clientY) / 44)
        const next = Math.min(values.length - 1, Math.max(0, drag.current.i + by))
        if (next !== i) onChange(values[next])
      }}
      onPointerUp={() => (drag.current = null)}
      onPointerCancel={() => (drag.current = null)}
      className="flex min-w-px flex-1 touch-none flex-col items-center overflow-hidden rounded-xl outline-none focus-visible:outline-2 focus-visible:outline-brand-border select-none"
    >
      {[-2, -1, 0, 1, 2].map((o) => {
        const v = values[i + o]
        const selected = o === 0
        return (
          <div
            key={o}
            role="option"
            aria-selected={selected}
            onClick={() => v !== undefined && onChange(v)}
            className={`flex h-11 w-full cursor-pointer items-center justify-center rounded-xl px-2 text-base leading-6 ${
              selected ? 'bg-bg-surface font-semibold text-text-primary' : 'font-medium text-text-tertiary'
            }`}
          >
            {v !== undefined ? format(v) : ''}
          </div>
        )
      })}
    </div>
  )
}

type DatePickerProps = {
  open: boolean
  onClose: () => void
  title: string
  /** Current value as "DD / MM / YYYY" (may be empty). */
  value: string
  minYear: number
  maxYear: number
  /** Year shown first when there is no value yet. */
  defaultYear: number
  onConfirm: (value: string) => void
}

/** UI/Date Picker — day / month / year wheels with a Done button. */
export function DatePicker({ open, onClose, title, value, minYear, maxYear, defaultYear, onConfirm }: DatePickerProps) {
  const parse = () => {
    const m = value.match(/^(\d{2}) \/ (\d{2}) \/ (\d{4})$/)
    return m ? { d: +m[1], m: +m[2], y: Math.min(maxYear, Math.max(minYear, +m[3])) } : { d: 1, m: 1, y: Math.min(maxYear, Math.max(minYear, defaultYear)) }
  }
  const [sel, setSel] = useState(parse)
  // Re-seed from the field each time the picker opens.
  useEffect(() => {
    if (open) setSel(parse())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const days = Array.from({ length: daysIn(sel.m, sel.y) }, (_, i) => i + 1)
  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i)
  const set = (patch: Partial<typeof sel>) =>
    setSel((s) => {
      const n = { ...s, ...patch }
      return { ...n, d: Math.min(n.d, daysIn(n.m, n.y)) }
    })

  return (
    <Overlay open={open} onClose={onClose} title={title}>
      <div className="flex items-start gap-0 rounded-[20px] bg-bg-surface-muted p-2">
        <Wheel label="Day" values={days} value={sel.d} format={pad as (v: number) => string} onChange={(d) => set({ d })} />
        <Wheel label="Month" values={MONTHS.map((_, i) => i + 1)} value={sel.m} format={(m) => MONTHS[m - 1]} onChange={(m) => set({ m })} />
        <Wheel label="Year" values={years} value={sel.y} format={String} onChange={(y) => set({ y })} />
      </div>
      <Button
        fullWidth
        onClick={() => {
          onConfirm(`${pad(sel.d)} / ${pad(sel.m)} / ${sel.y}`)
          onClose()
        }}
      >
        Done
      </Button>
    </Overlay>
  )
}

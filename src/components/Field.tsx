import type { ReactNode } from 'react'

type FieldProps = {
  label: string
  required?: boolean
  htmlFor?: string
  error?: string
  hint?: string
  className?: string
  children: ReactNode
}

/** Label (with required marker) above a control, with optional hint / error message below. */
export function Field({ label, required, htmlFor, error, hint, className = '', children }: FieldProps) {
  return (
    <div className={`flex w-full flex-col gap-1 ${className}`}>
      <label htmlFor={htmlFor} className="flex gap-1 text-sm font-medium text-text-primary">
        {label}
        {required && (
          <span className="text-danger" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p role="alert" className="m-0 text-xs leading-[18px] font-medium text-error">
          {error}
        </p>
      ) : (
        hint && <p className="m-0 mt-0.5 text-xs leading-[18px] text-text-tertiary">{hint}</p>
      )}
    </div>
  )
}

/** Shared 54px field shell: 52px visible box inset 1px; wrapper outline is the focus ring. */
export const controlShell = (error?: string) =>
  `rounded-[9px] p-px outline-2 ${error ? 'outline-danger-ring' : 'outline-transparent focus-within:outline-brand-border'}`
export const controlBox = (error?: string) =>
  `flex h-[52px] w-full items-center gap-3 rounded-[8px] border bg-white px-[15px] ${error ? 'border-danger-border' : 'border-[#b0b0b0]'}`

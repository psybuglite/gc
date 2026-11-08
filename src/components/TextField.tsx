import { useId, type InputHTMLAttributes } from 'react'

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  label: string
  required?: boolean
  error?: string
  hint?: string
  multiline?: boolean
  onChange: (value: string) => void
}

/** Input field: label with required marker, 14px/16px padded box, optional hint and error. */
export function TextField({ label, required, error, hint, multiline, onChange, className = '', ...rest }: TextFieldProps) {
  const id = useId()
  const box = `w-full rounded-[8px] border bg-white px-[15px] py-[16px] text-sm leading-[18px] font-medium text-[#3d3d3d] placeholder:text-[#3d3d3d]/50 outline-none ${
    error ? 'border-danger' : 'border-[#b0b0b0]'
  }`
  return (
    <div className={`flex w-full flex-col gap-1 ${className}`}>
      <label htmlFor={id} className="flex gap-1 text-sm leading-[18px] font-medium text-text-primary">
        {label}
        {required && <span className="text-danger" aria-hidden="true">*</span>}
      </label>
      {/* 54px field: 52px visible box inset 1px; the wrapper's outline is the focus ring */}
      <div className="rounded-[9px] p-px focus-within:outline-2 focus-within:outline-brand-border">
        {multiline ? (
          <textarea
            id={id}
            rows={1}
            aria-invalid={!!error}
            className={`${box} block resize-none [field-sizing:content]`}
            onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
            onChange={(e) => onChange(e.target.value.replace(/\n/g, ' '))}
            {...(rest as object)}
          />
        ) : (
          <input id={id} aria-invalid={!!error} className={box} onChange={(e) => onChange(e.target.value)} {...rest} />
        )}
      </div>
      {error ? (
        <p role="alert" className="m-0 text-xs leading-[18px] text-danger">
          {error}
        </p>
      ) : (
        hint && <p className="m-0 text-xs leading-[18px] text-text-tertiary">{hint}</p>
      )}
    </div>
  )
}

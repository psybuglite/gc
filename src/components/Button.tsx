import type { ButtonHTMLAttributes } from 'react'

export function Button({ className = '', children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brand-primary px-7 py-3.5 text-base leading-[18px] font-semibold text-text-on-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

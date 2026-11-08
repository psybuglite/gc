import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'link'
  size?: 'large' | 'small'
  fullWidth?: boolean
}

const variants = {
  primary: 'bg-brand-primary text-text-on-brand',
  outline: 'border border-border-strong bg-bg-surface text-text-primary',
  link: 'bg-transparent text-text-primary',
} as const

const sizes = {
  large: 'px-7 py-3.5 text-base',
  small: 'px-4 py-2 text-sm',
} as const

/** UI/Button — pill button. Disabled state is shown when `disabled` is set. */
export function Button({
  variant = 'primary',
  size = 'large',
  fullWidth = false,
  className = '',
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`flex cursor-pointer items-center justify-center gap-2 rounded-full leading-[18px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:cursor-not-allowed disabled:bg-bg-surface-muted disabled:text-text-tertiary disabled:border-transparent ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

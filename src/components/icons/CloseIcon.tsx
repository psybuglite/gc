import type { SVGProps } from 'react'

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" {...props}>
      <path d="M10.5 3.5L7 7M7 7L3.5 10.5M7 7L3.5 3.5M7 7L10.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

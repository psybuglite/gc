import type { SVGProps } from 'react'

export function MinusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path d="M4.16667 10H15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path d="M10 4.16667V10M10 10V15.8333M10 10H4.16667M10 10H15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function InfoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7 9.33333V7M7 4.66667H7.00583M12.8333 7C12.8333 10.2217 10.2217 12.8333 7 12.8333C3.77834 12.8333 1.16667 10.2217 1.16667 7C1.16667 3.77834 3.77834 1.16667 7 1.16667C10.2217 1.16667 12.8333 3.77834 12.8333 7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

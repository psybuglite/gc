import logoMark from '../assets/images/logo-mark.svg'
import { HelpIcon } from './icons/HelpIcon'

type TopBarProps = {
  onHelp?: () => void
}

/** UI/Top Bar — desktop shows a "Questions?" link, mobile shows a round help button. */
export function TopBar({ onHelp }: TopBarProps) {
  return (
    <header className="flex w-full items-center justify-between bg-bg-surface px-4 py-3 md:px-[70px] md:py-6">
      <img src={logoMark} alt="guideConnect" width={36} height={36} className="size-9" />
      <button
        type="button"
        onClick={onHelp}
        aria-label="Help"
        className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-bg-surface-muted text-text-primary md:size-auto md:rounded-none md:bg-transparent md:px-1 md:py-2"
      >
        <HelpIcon className="size-[18px] md:hidden" />
        <span className="hidden text-sm leading-[18px] font-semibold md:inline">Questions?</span>
      </button>
    </header>
  )
}

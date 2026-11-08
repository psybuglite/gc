import { useState } from 'react'
import logoMark from '../assets/images/logo-mark.svg'
import { Button } from './Button'
import { HelpIcon } from './icons/HelpIcon'
import { HelpCenter } from './overlays/HelpCenter'

type TopBarProps = {
  onHelp?: () => void
  /** Shows the outlined "Save & exit" button (application steps). */
  onSaveExit?: () => void
}

/** UI/Top Bar — desktop shows a "Questions?" link, mobile shows a round help button. */
export function TopBar({ onHelp, onSaveExit }: TopBarProps) {
  const [help, setHelp] = useState(false)
  return (
    <header className="flex w-full items-center justify-between bg-bg-surface px-4 py-3 md:px-[70px] md:py-6">
      <img src={logoMark} alt="guideConnect" width={36} height={36} className="size-9" />
      <div className="flex items-center gap-2 md:gap-5">
      <button
        type="button"
        onClick={onHelp ?? (() => setHelp(true))}
        aria-haspopup="dialog"
        aria-label="Help"
        className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-bg-surface-muted text-text-primary md:size-auto md:rounded-none md:bg-transparent md:px-1 md:py-2"
      >
        <HelpIcon className="size-[18px] md:hidden" />
        <span className="hidden text-sm font-semibold md:inline">Questions?</span>
      </button>
      {onSaveExit && (
        <Button variant="outline" size="small" onClick={onSaveExit}>
          Save &amp; exit
        </Button>
      )}
      </div>
      <HelpCenter open={help} onClose={() => setHelp(false)} />
    </header>
  )
}

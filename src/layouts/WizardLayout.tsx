import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { TopBar } from '../components/TopBar'

type WizardLayoutProps = {
  step: number
  quarters?: number
  stepLabel: string
  title: string
  subtitle?: string
  backTo?: string
  onNext: () => void
  nextLabel?: string
  nextDisabled?: boolean
  children: ReactNode
}

/** Shared frame for the numbered application steps: top bar, centred 560px column, progress footer. */
export function WizardLayout({ step, quarters, stepLabel, title, subtitle, backTo, onNext, nextLabel, nextDisabled, children }: WizardLayoutProps) {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-screen flex-col bg-bg-surface">
      <TopBar onSaveExit={() => navigate('/apply')} />
      <main className="flex flex-1 flex-col items-center px-4 pt-4 pb-6 md:px-20 md:pt-10 md:pb-8">
        <div className="flex w-full max-w-[560px] flex-col items-start gap-5 md:gap-6">
          <div className="flex w-full flex-col gap-2">
            <h1 className="m-0 text-2xl leading-8 font-semibold text-text-primary md:text-[40px] md:leading-[48px] md:tracking-[-0.6px]">{title}</h1>
            {subtitle && <p className="m-0 text-base leading-6 text-text-secondary">{subtitle}</p>}
          </div>
          {children}
        </div>
      </main>
      <Footer
        step={step}
        quarters={quarters}
        label={stepLabel}
        onBack={() => (backTo ? navigate(backTo) : navigate(-1))}
        onNext={onNext}
        nextLabel={nextLabel}
        nextDisabled={nextDisabled}
      />
    </div>
  )
}

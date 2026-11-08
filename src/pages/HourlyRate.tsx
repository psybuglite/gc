import { useNavigate } from 'react-router-dom'
import { InfoIcon, MinusIcon, PlusIcon } from '../components/icons/StepperIcons'
import { WizardLayout } from '../layouts/WizardLayout'
import { useApplication } from '../state/application'

const MIN = 5
const MAX = 500
const FEE = 0.15
const usd = (n: number) => `$${n.toFixed(2)}`

function StepButton({ label, onClick, disabled, children }: { label: string; onClick: () => void; disabled: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border-strong bg-bg-surface text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  )
}

/** Step 2d — Hourly rate (Figma 16083:6198 / mobile 16083:6263). */
export default function HourlyRate() {
  const navigate = useNavigate()
  const { data, update } = useApplication()
  const rate = data.hourlyRate
  const fee = rate * FEE
  const set = (n: number) => update({ hourlyRate: Math.min(MAX, Math.max(MIN, n)) })

  return (
    <WizardLayout
      step={2}
      quarters={4}
      stepLabel="Your experiences"
      title="Set your hourly rate"
      subtitle="You can change it any time. Travellers never pay booking fees."
      backTo="/apply/story"
      onNext={() => navigate('/apply/photos')}
    >
      <div className="flex w-full flex-col items-center gap-3 rounded-2xl bg-bg-surface-muted p-6 md:p-10">
        <div className="flex items-center gap-8 max-md:gap-6">
          <StepButton label="Decrease rate" onClick={() => set(rate - 1)} disabled={rate <= MIN}>
            <MinusIcon />
          </StepButton>
          <output aria-live="polite" className="text-[72px] leading-[80px] font-semibold tracking-[-1.08px] whitespace-nowrap text-text-primary">
            ${rate}
          </output>
          <StepButton label="Increase rate" onClick={() => set(rate + 1)} disabled={rate >= MAX}>
            <PlusIcon />
          </StepButton>
        </div>
        <p className="m-0 text-base leading-[18px] font-medium text-text-secondary">per hour</p>
        <div className="flex items-center gap-1.5 rounded-full bg-bg-surface px-3 py-1.5 text-xs leading-[18px] font-medium whitespace-nowrap text-text-secondary">
          <InfoIcon className="size-3.5 text-text-tertiary" />
          Most Lagos guides charge $20–$40
        </div>
      </div>

      <dl className="m-0 flex w-full flex-col gap-3 text-sm leading-[18px]">
        <div className="flex justify-between">
          <dt className="text-text-secondary">Your rate</dt>
          <dd className="m-0 font-medium text-text-primary">{usd(rate)}</dd>
        </div>
        <div className="flex justify-between text-text-secondary">
          <dt>guideConnect fee (15%)</dt>
          <dd className="m-0 font-medium">−{usd(fee)}</dd>
        </div>
        <div className="h-px w-full bg-border-subtle" />
        <div className="flex justify-between text-base font-semibold text-text-primary">
          <dt>You earn per hour</dt>
          <dd className="m-0">{usd(rate - fee)}</dd>
        </div>
      </dl>
    </WizardLayout>
  )
}

import { useNavigate } from 'react-router-dom'
import photo1 from '../assets/images/intro-photo-1.jpg'
import photo2 from '../assets/images/intro-photo-2.jpg'
import photo3 from '../assets/images/intro-photo-3.jpg'
import photo4 from '../assets/images/intro-photo-4.jpg'
import { Button } from '../components/Button'
import { CheckIcon } from '../components/icons/CheckIcon'
import { TopBar } from '../components/TopBar'

const NEEDS = ['A government-issued ID', '4–6 photos of you or your tours', '2 references who aren’t family']

function Photo({ src, className = '' }: { src: string; className?: string }) {
  return (
    <div className={`relative min-h-px w-full flex-1 overflow-hidden rounded-3xl ${className}`}>
      <img src={src} alt="" className="absolute inset-0 size-full object-cover" />
    </div>
  )
}

export default function Introduction() {
  const navigate = useNavigate()
  const start = () => navigate('/apply/profile')

  return (
    <div className="flex min-h-screen flex-col bg-bg-surface">
      <TopBar />

      <main className="flex flex-1 flex-col items-center px-4 pt-4 pb-6 md:flex-row md:items-center md:gap-16 md:px-0 md:py-0 md:pl-20">
        <div className="flex w-full max-w-[560px] flex-col gap-5 md:min-w-px md:flex-1 md:gap-8">
          <img src={photo1} alt="" className="h-[220px] w-full rounded-3xl object-cover md:hidden" />

          <div className="flex flex-col gap-2 md:gap-3">
            <p className="m-0 text-sm font-semibold text-brand-text md:hidden">Become a guide</p>
            <h1 className="m-0 text-2xl leading-8 font-semibold text-text-primary md:text-[40px] md:leading-[52px] md:tracking-[-0.6px]">
              Turn your love for Lagos into income
            </h1>
            <p className="m-0 text-base leading-6 text-text-secondary">
              Share the food, places and stories travellers won’t find in a guidebook
              <span className="hidden md:inline"> — on your schedule, at your price</span>.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:gap-3.5">
            <p className="m-0 text-sm font-semibold text-text-tertiary">What you’ll need · about 10 minutes</p>
            {NEEDS.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-success-bg text-success-text">
                  <CheckIcon className="size-3.5" />
                </span>
                <span className="text-sm font-medium text-text-primary md:text-base">{item}</span>
              </div>
            ))}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <Button onClick={start}>Get started</Button>
            <span className="text-sm text-text-tertiary">Your progress saves as you go</span>
          </div>
        </div>

        <div className="hidden h-[711px] min-w-px flex-1 gap-4 p-6 md:flex">
          <div className="flex min-w-px flex-1 flex-col gap-4">
            <Photo src={photo1} />
            <Photo src={photo2} />
          </div>
          <div className="flex min-w-px flex-1 flex-col gap-4 pt-12">
            <Photo src={photo3} />
            <Photo src={photo4} />
          </div>
        </div>
      </main>

      <footer className="px-4 pt-2 pb-[34px] md:hidden">
        <Button fullWidth onClick={start}>
          Get started
        </Button>
      </footer>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { TopBar } from '../components/TopBar'

/** Placeholder confirmation. The real "Application submitted" screen (Figma 16088:6931) is in the status-screens pass. */
export default function Submitted() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-surface">
      <TopBar />
      <main className="flex flex-1 flex-col items-center px-4 pt-10 md:px-20">
        <div className="flex w-full max-w-[560px] flex-col items-start gap-5">
          <h1 className="m-0 text-2xl leading-8 font-semibold text-text-primary md:text-[40px] md:leading-[52px] md:tracking-[-0.6px]">Application submitted</h1>
          <p className="m-0 text-base leading-6 text-text-secondary">Thanks — we’ll review your application and email you within 24–48 hours.</p>
          <Link to="/apply">
            <Button>Back to start</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

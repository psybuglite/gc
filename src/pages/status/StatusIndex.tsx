import { Link } from 'react-router-dom'
import { TopBar } from '../../components/TopBar'

const STATES = [
  ['/apply/submitted', 'Application submitted'],
  ['/apply/status/review', 'Under review'],
  ['/apply/status/changes', 'Changes requested'],
  ['/apply/status/approved', 'Approved'],
  ['/apply/status/rejected', 'Not approved'],
]

/** Preview list of the application status screens (there is no backend to drive them yet). */
export default function StatusIndex() {
  return (
    <div className="flex min-h-dvh flex-col bg-bg-surface">
      <TopBar />
      <main className="mx-auto flex w-full max-w-[560px] flex-col gap-4 px-4 pt-6 md:px-0">
        <h1 className="m-0 text-2xl leading-8 font-semibold text-text-primary">Application status screens</h1>
        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          {STATES.map(([to, label]) => (
            <li key={to}>
              <Link to={to} className="block rounded-xl border border-border-subtle px-4 py-3.5 text-base leading-6 font-medium text-text-primary no-underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

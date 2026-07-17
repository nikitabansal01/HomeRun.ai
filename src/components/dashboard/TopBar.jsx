import { Link } from 'react-router-dom'
import { ArrowLeft, AudioLines } from 'lucide-react'
import { household } from '../../data/mockData'
import AskBar from './AskBar'

export default function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-night-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-white"
          >
            <ArrowLeft size={15} />
          </Link>
          <div className="h-5 w-px bg-line" />
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-pulse-500 to-glow-500 text-white">
              <AudioLines size={14} />
            </span>
            <div className="leading-tight">
              <p className="font-display text-sm font-semibold text-white">Homerun.ai</p>
              <p className="font-mono text-[10px] text-slate-500">{household.familyName}</p>
            </div>
          </div>
        </div>

        <AskBar />
      </div>
    </header>
  )
}

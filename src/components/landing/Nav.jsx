import { Link } from 'react-router-dom'
import { ArrowRight, AudioLines } from 'lucide-react'

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-night-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-pulse-500 to-glow-500 text-white">
            <AudioLines size={16} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-white">
            Homerun<span className="grad-text">.ai</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-400 md:flex">
          <a href="#voices" className="transition hover:text-white">Family voices</a>
          <a href="#smart" className="transition hover:text-white">Smart inputs</a>
          <a href="#layers" className="transition hover:text-white">Your people</a>
          <a href="#integrations" className="transition hover:text-white">Integrations</a>
        </nav>

        <Link
          to="/app"
          className="group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-night-950 transition hover:bg-pulse-300"
        >
          Try the demo
          <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
        </Link>
      </div>
    </header>
  )
}

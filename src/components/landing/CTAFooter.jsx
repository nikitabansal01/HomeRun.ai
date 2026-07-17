import { Link } from 'react-router-dom'
import { ArrowRight, AudioLines } from 'lucide-react'

export default function CTAFooter() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grad-border relative overflow-hidden rounded-2xl px-8 py-16 text-center shadow-panel sm:px-16">
          <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[500px] -translate-x-1/2 rounded-full bg-pulse-600/25 blur-[90px]" />
          <p className="relative font-mono text-xs uppercase tracking-[0.25em] text-glow-400">
            Every family deserves this
          </p>
          <h2 className="relative mx-auto mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
            An AI that remembers what matters —
            <span className="grad-text"> and says it like family.</span>
          </h2>
          <div className="relative mt-9 flex justify-center">
            <Link
              to="/app"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pulse-500 to-glow-500 px-7 py-3.5 text-sm font-semibold text-white shadow-glow-violet transition hover:shadow-glow-cyan"
            >
              Try the interactive demo
              <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-line py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-500 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-pulse-500 to-glow-500 text-white">
              <AudioLines size={12} />
            </span>
            <span className="font-medium text-slate-300">Homerun.ai</span>
          </div>
          <p>A concept product · design & prototype by Nikita Bansal</p>
        </div>
      </footer>
    </>
  )
}

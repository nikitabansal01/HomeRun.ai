import { AudioLines, AtSign, Sheet, Camera, School, CalendarDays } from 'lucide-react'
import { integrations } from '../../data/mockData'

const ICONS = {
  'int-1': AudioLines,
  'int-2': AtSign,
  'int-3': Sheet,
  'int-4': Camera,
  'int-5': School,
  'int-6': CalendarDays,
}

export default function Integrations() {
  return (
    <section id="integrations" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-glow-400">Connected via MCP</p>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Plugs into what your family already uses.
        </h2>
        <p className="mt-5 text-base leading-relaxed text-slate-400">
          Built on persistent memory and ElevenLabs conversational voice, Homerun reads from
          your real accounts through MCP — and remembers what it learns.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {integrations.map((item) => {
          const Icon = ICONS[item.id]
          return (
            <div
              key={item.id}
              className="panel flex flex-col items-center gap-2.5 px-4 py-6 text-center transition hover:border-white/15 hover:bg-white/[0.05]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/5 text-slate-300">
                <Icon size={17} />
              </span>
              <p className="text-sm font-semibold text-white">{item.name}</p>
              <p className="text-xs text-slate-500">{item.detail}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

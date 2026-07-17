import { useState } from 'react'
import {
  Phone, PenLine, CreditCard, ShoppingBasket, HeartHandshake, Utensils,
  Check, ArrowRightLeft, Sparkles, AudioLines, CircleCheck, ArrowRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { briefing } from '../../data/mockData'
import { AVATAR_COLORS } from '../../lib/colors'

const KIND_ICONS = {
  call: Phone,
  form: PenLine,
  bill: CreditCard,
  grocery: ShoppingBasket,
  warm: HeartHandshake,
  plan: Utensils,
}

function Avatar({ person, size = 'sm' }) {
  const dim = size === 'sm' ? 'h-6 w-6 text-[9px]' : 'h-7 w-7 text-[10px]'
  return (
    <span className={`flex ${dim} items-center justify-center rounded-full font-semibold ${AVATAR_COLORS[person.color]}`}>
      {person.initials}
    </span>
  )
}

function OwnerChip({ owner, viewer, partner }) {
  if (owner === 'you') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-pulse-500/30 bg-pulse-500/10 py-1 pl-1 pr-2.5 text-[11px] font-semibold text-pulse-200">
        <Avatar person={viewer} /> You
      </span>
    )
  }
  if (owner === 'sam') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-glow-500/30 bg-glow-500/10 py-1 pl-1 pr-2.5 text-[11px] font-semibold text-glow-200">
        <Avatar person={partner} /> {partner.name}
      </span>
    )
  }
  return null
}

export default function SharedBriefing() {
  const { viewer, partner, date, handled, comingUp, balance } = briefing
  const [items, setItems] = useState(briefing.today)
  const [done, setDone] = useState(() => new Set())
  const [acted, setActed] = useState(() => new Set())
  const [balanceState, setBalanceState] = useState('open') // open · passed · dismissed

  const remaining = items.filter((i) => !done.has(i.id)).length

  const toggleDone = (id) =>
    setDone((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const handoff = (id) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, owner: i.owner === 'you' ? 'sam' : 'you' } : i))
    )

  const passToSam = () => {
    setItems((prev) => prev.map((i) => (i.owner === 'you' ? { ...i, owner: 'sam', handedOff: true } : i)))
    setBalanceState('passed')
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Greeting + honest status line */}
      <header className="pt-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">{date} · morning</p>
        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
          Good morning, {viewer.name} & {partner.name}.
        </h1>
        <p className="mt-3 text-lg text-slate-300">
          You're on track.{' '}
          <span className="text-white">
            {remaining === 0 ? 'Nothing left that needs a human today.' : `${remaining} things need a human today`}
          </span>{' '}
          — the rest is handled.
        </p>
      </header>

      {/* Today — the things that need a person, with owner + reasoning */}
      <section className="space-y-3">
        {items.map((item) => {
          const Icon = KIND_ICONS[item.kind] ?? Sparkles
          const isDone = done.has(item.id)
          return (
            <div
              key={item.id}
              className={`panel p-4 transition sm:p-5 ${isDone ? 'opacity-45' : 'hover:border-white/15'}`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleDone(item.id)}
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${
                    isDone
                      ? 'border-emerald-500 bg-emerald-500 text-white'
                      : 'border-white/25 text-transparent hover:border-emerald-400'
                  }`}
                  aria-label={isDone ? 'Mark not done' : 'Mark done'}
                >
                  <Check size={13} />
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <Icon size={15} className="shrink-0 text-slate-400" />
                    <p className={`text-[15px] font-semibold ${isDone ? 'text-slate-500 line-through' : 'text-white'}`}>
                      {item.title}
                    </p>
                    <span className="font-mono text-[11px] text-slate-500">· {item.meta}</span>
                  </div>

                  {/* reasoning receipt — makes the memory legible */}
                  <p className="mt-1.5 flex items-start gap-1.5 text-xs text-slate-500">
                    <Sparkles size={11} className="mt-0.5 shrink-0 text-slate-600" />
                    {item.why}
                  </p>

                  {!isDone && (
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <OwnerChip owner={item.owner} viewer={viewer} partner={partner} />
                      {item.fromVoice && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-line bg-white/5 px-2 py-1 font-mono text-[10px] text-slate-400">
                          <AudioLines size={10} /> in {viewer.name}'s voice
                        </span>
                      )}
                      <button
                        onClick={() => handoff(item.id)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[11px] font-medium text-slate-400 transition hover:border-white/25 hover:text-white"
                      >
                        <ArrowRightLeft size={11} />
                        {item.owner === 'you' ? `Hand to ${partner.name}` : 'Take it back'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </section>

      {/* The occasional, gentle labor-balance check-in */}
      {balanceState !== 'dismissed' && (
        <section className="relative overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-500/[0.07] via-rose-500/[0.05] to-transparent p-5 sm:p-6">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="relative flex items-start gap-3.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-400/30 bg-amber-500/15 text-amber-200">
              <HeartHandshake size={18} />
            </span>

            {balanceState === 'passed' ? (
              <div className="min-w-0">
                <p className="font-display text-lg font-semibold text-white">Passed to {partner.name}. 💛</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                  He'll get them as reminders in your voice, so it still feels like it came from you — just off your plate.
                </p>
              </div>
            ) : (
              <div className="min-w-0 flex-1">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/25 bg-amber-500/10 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-amber-200/90">
                  Weekly check-in
                </span>
                <p className="mt-2.5 font-display text-lg font-semibold text-white">{balance.message}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{balance.detail}</p>

                {/* soft lean — a tilt, not a scoreboard; no numbers */}
                <div className="mt-4">
                  <div className="flex items-center gap-2.5">
                    <Avatar person={viewer} size="md" />
                    <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-glow-500/25">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-pulse-500 to-pulse-400"
                        style={{ width: `${balance.lean * 100}%` }}
                      />
                    </div>
                    <Avatar person={partner} size="md" />
                  </div>
                  <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-widest text-slate-500">
                    this week's load
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={passToSam}
                    className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 px-4 py-2 text-sm font-semibold text-night-950 transition hover:opacity-90"
                  >
                    <ArrowRightLeft size={14} /> Pass a few to {partner.name}
                  </button>
                  <button
                    onClick={() => setBalanceState('dismissed')}
                    className="rounded-full px-3 py-2 text-sm font-medium text-slate-400 transition hover:text-white"
                  >
                    Not now
                  </button>
                </div>
                <p className="mt-3 text-xs italic text-slate-500">{balance.reassurance}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* About to slip — proactive memory */}
      <section>
        <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
          Coming up · before it slips
        </h2>
        <div className="space-y-2.5">
          {comingUp.map((item) => {
            const Icon = KIND_ICONS[item.kind] ?? Sparkles
            const isActed = acted.has(item.id)
            return (
              <div key={item.id} className="panel flex items-center gap-3.5 p-4 transition hover:border-white/15">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                    item.warm ? 'border-rose-500/30 bg-rose-500/10 text-rose-300' : 'border-line bg-white/5 text-slate-400'
                  }`}
                >
                  <Icon size={14} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="truncate font-mono text-[10px] text-slate-500">{item.why}</p>
                </div>
                {isActed ? (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                    <Check size={11} /> Done
                  </span>
                ) : (
                  <button
                    onClick={() => setActed((prev) => new Set(prev).add(item.id))}
                    className="shrink-0 rounded-full border border-line px-3 py-1.5 text-[11px] font-semibold text-slate-300 transition hover:border-white/25 hover:text-white"
                  >
                    {item.action}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Reassurance — the chief-of-staff "I handled the rest" */}
      <div className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.02] px-4 py-3">
        <CircleCheck size={16} className="shrink-0 text-emerald-400" />
        <p className="text-sm text-slate-400">
          <span className="font-semibold text-slate-200">{handled.count} more things handled automatically</span>{' '}
          — {handled.detail}
        </p>
      </div>

      {/* Dig-in layer */}
      <Link
        to="/app/details"
        className="group flex items-center justify-between rounded-xl border border-line bg-white/[0.02] px-4 py-3.5 transition hover:border-white/15 hover:bg-white/[0.04]"
      >
        <span className="text-sm font-medium text-slate-300">Dig into everything — pantry, finances, movies, people</span>
        <ArrowRight size={16} className="text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-white" />
      </Link>
    </div>
  )
}

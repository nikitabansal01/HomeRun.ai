import { useEffect, useRef, useState } from 'react'
import { Clapperboard, AtSign, Plus, Check, Flame, Link2, ScanLine, X } from 'lucide-react'
import { movieFinds, movieNight, linkResolvePool } from '../../data/mockData'
import TileCard from './TileCard'

const IG_LINK = /instagram\.com\/(reel|reels|p|share|tv)\//i

// same link always resolves to the same movie; skips titles already in the list
function pickFromPool(url, existing) {
  let hash = 0
  for (const ch of url) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
  for (let i = 0; i < linkResolvePool.length; i++) {
    const movie = linkResolvePool[(hash + i) % linkResolvePool.length]
    if (!existing.some((f) => f.title.startsWith(movie.title))) return movie
  }
  return linkResolvePool[hash % linkResolvePool.length]
}

function NetflixBadge({ availability }) {
  return availability.onNetflix ? (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-status-good/30 bg-status-good/10 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide text-emerald-300">
      <Check size={9} /> On Netflix
    </span>
  ) : (
    <span
      title={availability.where}
      className="inline-flex shrink-0 items-center gap-1 rounded-full border border-line bg-white/5 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide text-slate-400"
    >
      <X size={9} /> Not on Netflix
    </span>
  )
}

export default function MovieRadar() {
  const [queued, setQueued] = useState(() => new Set())
  const [finds, setFinds] = useState(movieFinds)
  const [link, setLink] = useState('')
  const [resolving, setResolving] = useState(false)
  const [stage, setStage] = useState('')
  const [error, setError] = useState(null)
  const timersRef = useRef([])

  useEffect(() => () => timersRef.current.forEach(clearTimeout), [])

  const addToQueue = (id) => setQueued((prev) => new Set(prev).add(id))

  const resolveLink = (e) => {
    e.preventDefault()
    const url = link.trim()
    if (!url) return
    if (!IG_LINK.test(url)) {
      setError("That doesn't look like an Instagram post or reel link.")
      return
    }
    if (resolving) return
    setError(null)
    setResolving(true)
    const movie = pickFromPool(url, finds)
    const steps = [
      ['Fetching post…', 0],
      ['Reading caption + audio…', 700],
      [`Identified: ${movie.title} (${movie.year})`, 1500],
      ['Checking Netflix availability…', 2200],
    ]
    steps.forEach(([label, delay]) =>
      timersRef.current.push(setTimeout(() => setStage(label), delay))
    )
    timersRef.current.push(
      setTimeout(() => {
        setResolving(false)
        setStage('')
        setLink('')
        setFinds((prev) => [
          {
            id: `link-${Date.now()}`,
            title: `${movie.title} (${movie.year})`,
            from: 'link drop',
            note: `"identified via ${movie.signal}"`,
            forwardedAt: 'now',
            runtime: movie.runtime,
            match: movie.match,
            availability: movie.availability,
          },
          ...prev,
        ])
      }, 2900)
    )
  }

  return (
    <TileCard
      icon={Clapperboard}
      title="Movie radar"
      subtitle="instagram forwards · netflix availability"
      badge={
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-slate-300">
          <AtSign size={10} className="text-rose-300" /> Connected
        </span>
      }
    >
      <div className="rounded-xl border border-glow-500/30 bg-glow-500/[0.06] px-4 py-3.5">
        <div className="flex items-center justify-between gap-2">
          <p className="font-display text-[15px] font-semibold text-white">🎬 {movieNight.tonight.title}</p>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-pulse-500 to-glow-500 px-2 py-0.5 text-[10px] font-bold text-white">
            <Flame size={10} /> {movieNight.tonight.matchScore}%
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-400">{movieNight.tonight.reason}</p>
        <p className="mt-2 font-mono text-[10px] text-glow-300">
          queued for {movieNight.dinnerReadyAt} · {movieNight.tonight.runtime} · starts when plates hit the table
        </p>
      </div>

      <form
        onSubmit={resolveLink}
        className="mt-4 flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 transition focus-within:border-glow-500/50"
      >
        <Link2 size={13} className="shrink-0 text-slate-500" />
        <input
          value={link}
          onChange={(e) => {
            setLink(e.target.value)
            setError(null)
          }}
          placeholder="Drop an Instagram reel or post link…"
          className="w-full bg-transparent text-xs text-white placeholder:text-slate-600 focus:outline-none"
          disabled={resolving}
        />
        <button
          type="submit"
          disabled={resolving || !link.trim()}
          className="shrink-0 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-night-950 transition hover:bg-glow-300 disabled:opacity-40"
        >
          Resolve
        </button>
      </form>

      {error && <p className="mt-2 px-1 text-xs text-rose-300">{error}</p>}
      {resolving && (
        <div className="mt-2 flex items-center gap-2.5 rounded-lg border border-pulse-500/40 bg-pulse-500/10 px-3.5 py-2">
          <ScanLine size={13} className="animate-pulse text-pulse-300" />
          <p className="font-mono text-[11px] text-pulse-300">{stage}</p>
        </div>
      )}

      <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-slate-500">
        forwarded + dropped links
      </p>
      <div className="mt-2 space-y-2">
        {finds.map((find) => {
          const isQueued = queued.has(find.id)
          return (
            <div key={find.id} className="flex items-start gap-3 rounded-lg border border-line bg-white/[0.02] px-3 py-2.5 transition hover:bg-white/[0.04]">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-300">
                {find.from === 'link drop' ? <Link2 size={12} /> : <AtSign size={12} />}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold text-white">{find.title}</p>
                  <NetflixBadge availability={find.availability} />
                </div>
                <p className="truncate text-xs text-slate-500">
                  <span className="text-slate-400">{find.from}</span> · {find.note}
                </p>
                <p className="mt-1 font-mono text-[10px] text-slate-600">
                  {find.runtime} · {find.match}% family match · {find.availability.where}
                  {find.adultsOnly ? ' · adults only' : ''}
                </p>
              </div>
              <button
                onClick={() => addToQueue(find.id)}
                disabled={isQueued}
                className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition ${
                  isQueued
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'border border-line bg-white/5 text-slate-400 hover:border-glow-500/50 hover:text-white'
                }`}
                aria-label={isQueued ? 'Queued' : 'Add to family queue'}
              >
                {isQueued ? <Check size={13} /> : <Plus size={13} />}
              </button>
            </div>
          )
        })}
      </div>

      <p className="mt-4 text-xs text-slate-600">
        Paste any instagram.com/reel or /p link — Homerun identifies the movie and checks
        where it streams.
      </p>
    </TileCard>
  )
}

import { useEffect, useRef, useState } from 'react'
import { Play, Square, AudioLines, Check } from 'lucide-react'
import { voiceReminders, familyMembers, parentsInLaws } from '../../data/mockData'
import { AVATAR_COLORS } from '../../lib/colors'
import { speak } from '../../lib/voice'

const PEOPLE = [...familyMembers, ...parentsInLaws]

function Waveform({ active }) {
  const bars = [5, 11, 16, 9, 14, 7, 12, 6, 15, 10, 5, 13]
  return (
    <div className="flex h-5 items-center gap-[3px]">
      {bars.map((h, i) => (
        <span
          key={i}
          className={`w-[3px] rounded-full bg-gradient-to-t from-pulse-500 to-glow-400 ${
            active ? 'animate-waveform' : ''
          }`}
          style={{ height: active ? `${h}px` : '3px', animationDelay: `${i * 80}ms` }}
        />
      ))}
    </div>
  )
}

export default function VoiceReminders() {
  const [playingId, setPlayingId] = useState(null)
  const [doneIds, setDoneIds] = useState(() => new Set())
  const stopRef = useRef(null)

  useEffect(() => () => stopRef.current?.(), [])

  const togglePlay = (reminder) => {
    if (playingId === reminder.id) {
      stopRef.current?.()
      stopRef.current = null
      setPlayingId(null)
      return
    }
    stopRef.current?.()
    const person = PEOPLE.find((p) => p.id === reminder.fromId)
    stopRef.current = speak(reminder.text, person?.voice, {
      onStart: () => setPlayingId(reminder.id),
      onEnd: () => setPlayingId(null),
    })
  }

  const markDone = (id) => {
    if (playingId === id) {
      stopRef.current?.()
      stopRef.current = null
      setPlayingId(null)
    }
    setDoneIds((prev) => new Set(prev).add(id))
  }

  return (
    <section className="grad-border rounded-2xl p-6 shadow-panel sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-pulse-500 to-glow-500 text-white">
            <AudioLines size={16} />
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold text-white">Voice reminders</h2>
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
              first person · elevenlabs cloned voices
            </p>
          </div>
        </div>
        <p className="hidden text-xs text-slate-500 sm:block">
          Demo plays a simulated voice — production streams the member's real clone.
        </p>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        {voiceReminders.map((r) => {
          const person = PEOPLE.find((p) => p.id === r.fromId)
          const isPlaying = playingId === r.id
          const isDone = doneIds.has(r.id)
          return (
            <div
              key={r.id}
              className={`rounded-xl border p-4 transition ${
                isDone
                  ? 'border-line bg-white/[0.02] opacity-45'
                  : isPlaying
                  ? 'border-pulse-500/50 bg-pulse-500/[0.07] shadow-glow-violet'
                  : 'border-line bg-white/[0.03] hover:bg-white/[0.05]'
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-xs font-semibold ${AVATAR_COLORS[person?.color] ?? ''}`}
                >
                  {person?.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-sm font-semibold text-white">
                      {r.from} <span className="font-normal text-slate-500">→ {r.to}</span>
                    </p>
                    <span className="shrink-0 font-mono text-[10px] text-slate-500">{r.time}</span>
                  </div>
                  <p className={`mt-1 text-sm leading-relaxed ${isDone ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
                    "{r.text}"
                  </p>
                  <p className="mt-1.5 font-mono text-[10px] text-slate-600">{r.context}</p>
                </div>
              </div>

              {!isDone && (
                <div className="mt-3 flex items-center gap-3 border-t border-line pt-3">
                  <button
                    onClick={() => togglePlay(r)}
                    className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
                      isPlaying
                        ? 'bg-pulse-500 text-white'
                        : 'border border-line bg-white/5 text-slate-300 hover:border-pulse-500/50 hover:text-white'
                    }`}
                    aria-label={isPlaying ? 'Stop' : `Play in ${r.from}'s voice`}
                  >
                    {isPlaying ? <Square size={12} /> : <Play size={12} className="ml-0.5" />}
                  </button>
                  <Waveform active={isPlaying} />
                  <span className="font-mono text-[10px] text-slate-600">
                    {isPlaying ? 'playing…' : `in ${r.from}'s voice`}
                  </span>
                  <button
                    onClick={() => markDone(r.id)}
                    className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-slate-400 transition hover:border-emerald-500/50 hover:text-emerald-300"
                  >
                    <Check size={12} /> Done
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

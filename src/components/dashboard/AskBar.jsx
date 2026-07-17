import { useEffect, useRef, useState } from 'react'
import { Mic, Sparkles } from 'lucide-react'
import { voiceQueries } from '../../data/mockData'

const ANSWERS = {
  'What are we forgetting this week?':
    "Two things: the Amex payment is overdue, and it's been 47 days since anyone called Miguel.",
  'Who is picking up Maya from soccer on Friday?':
    'Sam is picking up Maya at 4:00 PM — carpooling with the Okafors.',
  'Do we have enough groceries for dinner tonight?':
    "You're out of milk and low on eggs — everything else for tonight's pasta is stocked from the Jul 12 receipt.",
  'How much did we spend eating out this month?':
    '$284 on dining out so far in July, about 6% of your monthly budget.',
  'When did we last visit my parents?':
    'You last saw Robert and Linda on June 28th — 18 days ago. Miguel is overdue for a call.',
  'Find a movie everyone in the family will enjoy during dinner.':
    "The Mitchells vs. the Machines — 94% match, 113 min, queued for 6:30 PM so it starts the moment dinner's served.",
}

export default function AskBar() {
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [value, setValue] = useState('')
  const [answer, setAnswer] = useState(null)
  const timerRef = useRef(null)

  useEffect(() => {
    const id = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % voiceQueries.length)
    }, 3200)
    return () => clearInterval(id)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value.trim()) return
    clearTimeout(timerRef.current)
    setAnswer(null)
    timerRef.current = setTimeout(() => {
      setAnswer(
        ANSWERS[value] ??
          "That's outside this demo's script — in the real product, Homerun would check your connected accounts and answer live."
      )
    }, 500)
  }

  return (
    <div className="relative w-full md:w-[440px]">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-3 py-2 transition focus-within:border-pulse-500/50 focus-within:shadow-glow-violet"
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pulse-500/15 text-pulse-300">
          <Mic size={14} />
        </span>
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            if (!e.target.value) setAnswer(null)
          }}
          placeholder={`Ask… "${voiceQueries[placeholderIndex]}"`}
          className="w-full bg-transparent text-sm text-white placeholder:text-slate-600 focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-night-950 transition hover:bg-pulse-300"
        >
          Ask
        </button>
      </form>

      {answer && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 rounded-xl border border-line bg-night-850 p-4 shadow-panel">
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-glow-500/15 text-glow-300">
              <Sparkles size={12} />
            </span>
            <p className="text-sm leading-relaxed text-slate-300">{answer}</p>
          </div>
        </div>
      )}
    </div>
  )
}

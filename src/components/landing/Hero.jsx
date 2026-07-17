import { Link } from 'react-router-dom'
import { ArrowRight, AudioLines, Play } from 'lucide-react'

const WAVE_BARS = [4, 9, 14, 8, 16, 11, 6, 13, 9, 5]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-pulse-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-64 right-[-10%] h-[400px] w-[400px] rounded-full bg-glow-500/10 blur-[100px]" />

      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 pb-24 pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:pb-32">
        <div className="flex flex-col justify-center">
          <div className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-pulse-500/30 bg-pulse-500/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-pulse-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pulse-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-pulse-400" />
            </span>
            VOICE-FIRST · BUILT ON ELEVENLABS + PERSISTENT MEMORY
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Your family's memory,
            <br />
            <span className="grad-text">speaking your language.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-400">
            Homerun.ai is an AI chief of staff that remembers everything your household
            needs — and reminds you <span className="text-slate-200">in the voice of whoever asked</span>.
            When your wife says "call the electrician," tomorrow's reminder sounds like her.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/app"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pulse-500 to-glow-500 px-6 py-3.5 text-sm font-semibold text-white shadow-glow-violet transition hover:shadow-glow-cyan"
            >
              Try the interactive demo
              <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#voices"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/10"
            >
              <Play size={15} /> Hear how it works
            </a>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="grad-border w-full max-w-md rounded-2xl p-5 shadow-panel">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Incoming reminder · 8:04 AM
            </p>

            <div className="mt-4 flex items-start gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cat-4/40 bg-cat-4/20 font-display text-sm font-semibold text-pulse-300">
                DR
              </span>
              <div>
                <p className="text-sm font-semibold text-white">
                  Dani <span className="font-normal text-slate-500">→ Sam · in Dani's voice</span>
                </p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-slate-300">
                  "Hey love — it's me. Don't forget to call the electrician about the panel
                  today. They close at five."
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-xl border border-line bg-white/[0.03] px-4 py-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-pulse-500 to-glow-500 text-white">
                <AudioLines size={14} />
              </span>
              <div className="flex h-6 flex-1 items-center gap-[3px]">
                {WAVE_BARS.map((h, i) => (
                  <span
                    key={i}
                    className="w-1 animate-waveform rounded-full bg-gradient-to-t from-pulse-500 to-glow-400"
                    style={{ height: `${h * 1.4}px`, animationDelay: `${i * 90}ms` }}
                  />
                ))}
              </div>
              <span className="font-mono text-xs text-slate-500">0:06</span>
            </div>

            <p className="mt-4 font-mono text-[10px] text-slate-600">
              voice: dani_rivera · cloned via ElevenLabs · consent on file
            </p>
          </div>

          <div className="absolute -bottom-8 -left-4 hidden rounded-xl border border-line bg-night-850 px-4 py-3 shadow-panel sm:block">
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">context</p>
            <p className="mt-1 text-xs text-slate-300">Asked yesterday, 9:12 PM · kitchen</p>
          </div>
        </div>
      </div>
    </section>
  )
}

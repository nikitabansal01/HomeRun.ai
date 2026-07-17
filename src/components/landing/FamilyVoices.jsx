import { AudioLines, ShieldCheck } from 'lucide-react'

const voices = [
  {
    initials: 'DR',
    name: 'Dani',
    colorClass: 'border-cat-4/40 bg-cat-4/20 text-pulse-300',
    line: '"Don\'t forget the electrician — they close at five."',
    tag: 'to Sam · callback',
  },
  {
    initials: 'MR',
    name: 'Maya, 9',
    colorClass: 'border-cat-5/40 bg-cat-5/20 text-amber-300',
    line: '"Mom! My field trip form is due Friday!"',
    tag: 'to Dani · school',
  },
  {
    initials: 'CO',
    name: 'Grandma Carmen',
    colorClass: 'border-cat-1/40 bg-cat-1/20 text-glow-300',
    line: '"Mijo, it\'s Sunday — call your mother!"',
    tag: 'to everyone · weekly ritual',
  },
]

export default function FamilyVoices() {
  return (
    <section id="voices" className="relative border-y border-line bg-night-900/60 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-glow-400">ElevenLabs voice engine</p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Reminders in first person,
            <br />
            <span className="grad-text">in the voice of whoever asked.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-400">
            A sticky note gets ignored. Your daughter's actual voice asking you to sign her
            field trip form does not. Each family member records a short consent clip; Homerun
            clones their voice with ElevenLabs and delivers their asks as if they said it themselves.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {voices.map((v) => (
            <div key={v.name} className="panel p-6 transition hover:border-white/15 hover:bg-white/[0.05]">
              <div className="flex items-center gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-full border font-display text-sm font-semibold ${v.colorClass}`}>
                  {v.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{v.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">{v.tag}</p>
                </div>
                <AudioLines size={16} className="ml-auto text-slate-600" />
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-300">{v.line}</p>
              <div className="mt-4 flex h-5 items-end gap-[3px]">
                {[3, 8, 12, 6, 14, 9, 4, 11, 7, 13, 5, 9].map((h, i) => (
                  <span
                    key={i}
                    className="w-[3px] rounded-full bg-gradient-to-t from-pulse-500/70 to-glow-400/70"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 flex max-w-md items-center justify-center gap-2 text-center text-xs text-slate-500">
          <ShieldCheck size={14} className="shrink-0 text-emerald-400" />
          Voices are cloned only with each member's recorded consent, stay private to your
          household, and can be deleted anytime.
        </p>
      </div>
    </section>
  )
}

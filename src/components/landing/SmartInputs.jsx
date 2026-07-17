import { Camera, AtSign, Sheet, ScanLine } from 'lucide-react'

const inputs = [
  {
    icon: Camera,
    title: 'Snap the grocery receipt',
    description:
      'Photograph the H-E-B receipt on your way in from the car. Homerun reads every line item, knows what entered the house and when, and predicts what runs out before it does.',
    demo: 'IMG_2041.jpg → 24 items parsed · milk runs out ~Thu',
  },
  {
    icon: AtSign,
    title: 'Forward the reel',
    description:
      'Saw a movie your kid would love on Instagram? Forward the DM to Homerun. It lands in the family movie radar with a match score against everyone\'s taste.',
    demo: '@priya.nair → "The Wild Robot" · 96% family match',
  },
  {
    icon: Sheet,
    title: 'Point it at the spreadsheet',
    description:
      'Connect the Google Sheet where you track credit cards — or just upload a photo of it. Homerun extracts every card, balance, and due date, and reminds you before interest ever hits.',
    demo: 'Family Finances 2026 → 4 cards synced · next due Jul 18',
  },
]

export default function SmartInputs() {
  return (
    <section id="smart" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-pulse-400">No forms. No data entry.</p>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Feed it the way you'd feed a person.
        </h2>
        <p className="mt-5 text-base leading-relaxed text-slate-400">
          Nobody maintains a grocery checklist at 9 PM. Homerun ingests the messy artifacts
          your family already produces — receipts, DMs, spreadsheets — and turns them into
          living state.
        </p>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {inputs.map(({ icon: Icon, title, description, demo }) => (
          <div key={title} className="panel group flex flex-col p-7 transition hover:border-white/15 hover:bg-white/[0.05]">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/5 text-glow-300 transition group-hover:border-glow-500/40 group-hover:shadow-glow-cyan">
              <Icon size={19} />
            </span>
            <h3 className="mt-5 font-display text-lg font-semibold text-white">{title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{description}</p>
            <div className="mt-5 flex items-center gap-2 rounded-lg border border-line bg-night-900 px-3 py-2.5">
              <ScanLine size={12} className="shrink-0 text-pulse-400" />
              <p className="truncate font-mono text-[11px] text-slate-400">{demo}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

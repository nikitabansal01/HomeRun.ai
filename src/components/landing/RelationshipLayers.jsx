import { Home, Users, Heart } from 'lucide-react'

const layers = [
  {
    icon: Home,
    title: 'Family at home',
    description:
      'Everyone under your roof — partners, kids, pets. Schedules, school, and daily routines, kept in sync.',
    accent: 'text-pulse-300 border-pulse-500/30 bg-pulse-500/10',
  },
  {
    icon: Users,
    title: 'Parents & in-laws',
    description:
      'The people you owe a call to. Homerun tracks who you last visited and when — before it turns into months.',
    accent: 'text-glow-300 border-glow-500/30 bg-glow-500/10',
  },
  {
    icon: Heart,
    title: 'Friends & extended circle',
    description:
      'Carpool partners, dinner-swap families, the friend who owes you a visit. Relationships worth keeping warm.',
    accent: 'text-rose-300 border-rose-500/30 bg-rose-500/10',
  },
]

export default function RelationshipLayers() {
  return (
    <section id="layers" className="border-y border-line bg-night-900/60 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-pulse-400">Who it's for</p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Three relationship layers.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-400">
            The same layers you'll find in the demo — because family life doesn't happen in
            one flat contact list.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {layers.map(({ icon: Icon, title, description, accent }) => (
            <div key={title} className="panel p-7 transition hover:border-white/15 hover:bg-white/[0.05]">
              <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border ${accent}`}>
                <Icon size={20} />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

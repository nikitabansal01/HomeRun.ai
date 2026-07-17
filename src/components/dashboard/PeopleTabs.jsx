import { useState } from 'react'
import { Home, Users, Heart, Phone, AudioLines } from 'lucide-react'
import { familyMembers, parentsInLaws, friends } from '../../data/mockData'
import { AVATAR_COLORS } from '../../lib/colors'
import { parseLocalDate } from '../../lib/date'

const TABS = [
  { id: 'family', label: 'Family at home', icon: Home, data: familyMembers },
  { id: 'parents', label: 'Parents & In-laws', icon: Users, data: parentsInLaws },
  { id: 'friends', label: 'Friends', icon: Heart, data: friends },
]

function daysSince(dateStr) {
  const diff = Date.now() - parseLocalDate(dateStr).getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

function PersonCard({ person }) {
  const days = person.lastContact ? daysSince(person.lastContact) : null
  const overdue = days !== null && days > 21

  return (
    <div className="panel flex items-start gap-3 p-4 transition hover:border-white/15 hover:bg-white/[0.05]">
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold ${AVATAR_COLORS[person.color]}`}
      >
        {person.initials}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-display text-[15px] font-semibold text-white">{person.name}</p>
          {person.voiceCloned && (
            <span
              title="Voice cloned via ElevenLabs"
              className="inline-flex shrink-0 items-center gap-1 rounded-full border border-pulse-500/30 bg-pulse-500/10 px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide text-pulse-300"
            >
              <AudioLines size={9} /> voice
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500">{person.role}</p>
        <p className="mt-1.5 text-xs leading-snug text-slate-400">{person.note}</p>
        {days !== null && (
          <p
            className={`mt-2 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
              overdue
                ? 'border-status-critical/30 bg-status-critical/10 text-rose-300'
                : 'border-status-good/30 bg-status-good/10 text-emerald-300'
            }`}
          >
            <Phone size={10} />
            {days === 0 ? 'Talked today' : `${days}d since last contact`}
          </p>
        )}
      </div>
    </div>
  )
}

export default function PeopleTabs() {
  const [active, setActive] = useState('family')
  const activeTab = TABS.find((t) => t.id === active)

  return (
    <section>
      <div className="flex flex-wrap items-center gap-2">
        {TABS.map(({ id, label, icon: Icon, data }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
              active === id
                ? 'bg-white text-night-950'
                : 'border border-line bg-white/[0.03] text-slate-400 hover:bg-white/[0.07] hover:text-white'
            }`}
          >
            <Icon size={15} />
            {label}
            <span
              className={`ml-0.5 rounded-full px-1.5 py-0.5 font-mono text-[10px] font-bold ${
                active === id ? 'bg-night-950/10 text-night-950' : 'bg-white/5 text-slate-500'
              }`}
            >
              {data.length}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {activeTab.data.map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}
      </div>
    </section>
  )
}

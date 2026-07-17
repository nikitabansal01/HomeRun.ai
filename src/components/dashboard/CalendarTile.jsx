import { useEffect, useRef, useState } from 'react'
import { CalendarHeart, Utensils, Trophy, Users as UsersIcon, Home, Plus, Check, Loader2, Link2 } from 'lucide-react'
import { calendarEvents, familyMembers, parentsInLaws, friends } from '../../data/mockData'
import { AVATAR_COLORS } from '../../lib/colors'
import { parseLocalDate } from '../../lib/date'
import TileCard from './TileCard'

const ALL_PEOPLE = [...familyMembers, ...parentsInLaws, ...friends]

const TYPE_ICONS = {
  dinner: Utensils,
  activity: Trophy,
  outing: UsersIcon,
  family: Home,
}

function formatDate(dateStr) {
  return parseLocalDate(dateStr).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

export default function CalendarTile() {
  // people who have a calendar to connect, seeded from mock data
  const [members, setMembers] = useState(() =>
    familyMembers.filter((m) => m.calendar).map((m) => ({ ...m, status: m.calendar.status }))
  )
  const [showConnect, setShowConnect] = useState(false)
  const [connectingId, setConnectingId] = useState(null)
  const timerRef = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const connectedCount = members.filter((m) => m.status === 'connected').length

  const connect = (id) => {
    if (connectingId) return
    setConnectingId(id)
    // simulate the OAuth round-trip
    timerRef.current = setTimeout(() => {
      setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, status: 'connected' } : m)))
      setConnectingId(null)
    }, 1600)
  }

  return (
    <TileCard
      icon={CalendarHeart}
      title="Calendar sync"
      subtitle={`${connectedCount} of ${members.length} calendars linked · google + icloud`}
      badge={
        <button
          onClick={() => setShowConnect((s) => !s)}
          className="inline-flex items-center gap-1.5 rounded-full border border-glow-500/40 bg-glow-500/10 px-2.5 py-1 text-[10px] font-semibold text-glow-300 transition hover:bg-glow-500/20"
        >
          <Plus size={11} /> Connect calendar
        </button>
      }
    >
      {showConnect && (
        <div className="mb-4 rounded-xl border border-glow-500/25 bg-glow-500/[0.05] p-3">
          <p className="px-1 pb-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">
            link each family member's calendar
          </p>
          <div className="space-y-1.5">
            {members.map((m) => {
              const isConnected = m.status === 'connected'
              const isConnecting = connectingId === m.id
              return (
                <div key={m.id} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5">
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${AVATAR_COLORS[m.color]}`}
                  >
                    {m.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">{m.name}</p>
                    <p className="truncate font-mono text-[10px] text-slate-500">
                      {m.calendar.provider} · {m.calendar.account}
                    </p>
                  </div>
                  {isConnected ? (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-status-good/30 bg-status-good/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                      <Check size={11} /> Linked
                    </span>
                  ) : (
                    <button
                      onClick={() => connect(m.id)}
                      disabled={isConnecting}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-night-950 transition hover:bg-glow-300 disabled:opacity-60"
                    >
                      {isConnecting ? (
                        <>
                          <Loader2 size={11} className="animate-spin" /> Linking…
                        </>
                      ) : (
                        <>
                          <Link2 size={11} /> Connect
                        </>
                      )}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
          <p className="mt-2 px-1 font-mono text-[10px] text-slate-600">
            each person approves once via their own google / icloud login
          </p>
        </div>
      )}

      <div className="space-y-2.5">
        {calendarEvents.map((event) => {
          const Icon = TYPE_ICONS[event.type] ?? CalendarHeart
          const attendees = event.attendees.map((id) => ALL_PEOPLE.find((p) => p.id === id)).filter(Boolean)
          return (
            <div key={event.id} className="rounded-xl border border-line bg-white/[0.02] px-3.5 py-3 transition hover:bg-white/[0.04]">
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-start gap-2.5">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-white/5 text-slate-400">
                    <Icon size={13} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">{event.title}</p>
                    <p className="font-mono text-[10px] text-slate-500">
                      {formatDate(event.date)} · {event.time}
                    </p>
                    {event.note && <p className="mt-1 text-xs italic text-slate-500">{event.note}</p>}
                  </div>
                </div>
                <div className="flex shrink-0 -space-x-2">
                  {attendees.slice(0, 3).map((p) => (
                    <span
                      key={p.id}
                      title={p.name}
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-[8px] font-bold ring-2 ring-night-850 ${AVATAR_COLORS[p.color]}`}
                    >
                      {p.initials}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </TileCard>
  )
}

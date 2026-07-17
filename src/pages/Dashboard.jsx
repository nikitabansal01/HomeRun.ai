import TopBar from '../components/dashboard/TopBar'
import VoiceReminders from '../components/dashboard/VoiceReminders'
import PeopleTabs from '../components/dashboard/PeopleTabs'
import PantryTile from '../components/dashboard/PantryTile'
import FinanceHub from '../components/dashboard/FinanceHub'
import CalendarTile from '../components/dashboard/CalendarTile'
import MovieRadar from '../components/dashboard/MovieRadar'

export default function Dashboard() {
  return (
    <div className="relative min-h-screen bg-night-950 pb-20 text-slate-200">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-pulse-600/10 to-transparent" />
      <TopBar />

      <main className="relative mx-auto max-w-6xl space-y-10 px-6 pt-8">
        <VoiceReminders />

        <div>
          <h2 className="font-display text-xl font-semibold text-white">Your people</h2>
          <p className="mt-1 text-sm text-slate-500">
            Everyone Homerun keeps track of, organized the way your family actually thinks about them.
          </p>
          <div className="mt-5">
            <PeopleTabs />
          </div>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-white">Household intelligence</h2>
          <p className="mt-1 text-sm text-slate-500">
            Fed by receipts, DMs, and spreadsheets — not checklists.
          </p>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <PantryTile />
            <FinanceHub />
            <MovieRadar />
            <CalendarTile />
          </div>
        </div>
      </main>
    </div>
  )
}

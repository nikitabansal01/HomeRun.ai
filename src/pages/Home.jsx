import TopBar from '../components/dashboard/TopBar'
import SharedBriefing from '../components/dashboard/SharedBriefing'

export default function Home() {
  return (
    <div className="relative min-h-screen bg-night-950 pb-20 text-slate-200">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[400px] bg-gradient-to-b from-pulse-600/10 to-transparent" />
      <TopBar />
      <main className="relative px-6 pt-8">
        <SharedBriefing />
      </main>
    </div>
  )
}

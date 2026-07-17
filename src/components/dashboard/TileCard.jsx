export default function TileCard({ icon: Icon, title, subtitle, badge, children }) {
  return (
    <div className="panel flex flex-col p-6 transition hover:border-white/15">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white/5 text-glow-300">
          <Icon size={17} />
        </span>
        <div className="min-w-0">
          <p className="font-display text-base font-semibold text-white">{title}</p>
          {subtitle && <p className="truncate font-mono text-[10px] uppercase tracking-widest text-slate-500">{subtitle}</p>}
        </div>
        {badge && <div className="ml-auto shrink-0">{badge}</div>}
      </div>
      <div className="mt-5 flex-1">{children}</div>
    </div>
  )
}

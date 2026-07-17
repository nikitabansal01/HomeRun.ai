// Explicit class maps so Tailwind's JIT compiler can find these classes
// (dynamically-built class strings like `bg-${color}-500` are invisible to it).
export const AVATAR_COLORS = {
  cat1: 'bg-cat-1/20 text-glow-300 border border-cat-1/40',
  cat2: 'bg-cat-2/20 text-rose-300 border border-cat-2/40',
  cat3: 'bg-cat-3/20 text-emerald-300 border border-cat-3/40',
  cat4: 'bg-cat-4/20 text-pulse-300 border border-cat-4/40',
  cat5: 'bg-cat-5/20 text-amber-300 border border-cat-5/40',
}

export const CATEGORY_BAR_COLORS = {
  cat1: 'bg-cat-1',
  cat2: 'bg-cat-2',
  cat3: 'bg-cat-3',
  cat4: 'bg-cat-4',
  cat5: 'bg-cat-5',
}

export const STATUS_STYLES = {
  overdue: { label: 'Overdue', className: 'bg-status-critical/15 text-rose-300 border border-status-critical/30' },
  'due-soon': { label: 'Due soon', className: 'bg-status-warning/15 text-amber-300 border border-status-warning/30' },
  upcoming: { label: 'Upcoming', className: 'bg-white/5 text-slate-300 border border-white/10' },
  paid: { label: 'Paid', className: 'bg-status-good/15 text-emerald-300 border border-status-good/30' },
}

export const STOCK_STYLES = {
  out: { label: 'Out', className: 'bg-status-critical/15 text-rose-300 border border-status-critical/30' },
  low: { label: 'Low', className: 'bg-status-warning/15 text-amber-300 border border-status-warning/30' },
  stocked: { label: 'Stocked', className: 'bg-status-good/15 text-emerald-300 border border-status-good/30' },
}

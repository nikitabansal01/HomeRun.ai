import { useEffect, useRef, useState } from 'react'
import { Wallet, Check, RefreshCw, Sheet, Camera, CreditCard } from 'lucide-react'
import { creditCards, bills, spendByCategory, monthlyBudget, financeMeta } from '../../data/mockData'
import { STATUS_STYLES, CATEGORY_BAR_COLORS } from '../../lib/colors'
import { parseLocalDate } from '../../lib/date'
import TileCard from './TileCard'

function formatMoney(n) {
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: n % 1 === 0 ? 0 : 2 })}`
}

function formatDue(dateStr) {
  return parseLocalDate(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function FinanceHub() {
  const [paidIds, setPaidIds] = useState(() => new Set())
  const [syncing, setSyncing] = useState(false)
  const [lastSync, setLastSync] = useState(financeMeta.lastSync)
  const fileRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const pct = Math.round((monthlyBudget.spent / monthlyBudget.budget) * 100)
  const maxCategory = Math.max(...spendByCategory.map((c) => c.amount))
  const markPaid = (id) => setPaidIds((prev) => new Set(prev).add(id))

  const runSync = () => {
    if (syncing) return
    setSyncing(true)
    timerRef.current = setTimeout(() => {
      setSyncing(false)
      setLastSync('just now')
    }, 1600)
  }

  const sortedCards = [...creditCards].sort((a, b) => parseLocalDate(a.dueDate) - parseLocalDate(b.dueDate))

  return (
    <TileCard
      icon={Wallet}
      title="Finance hub"
      subtitle={`${monthlyBudget.month} · cards from google sheets`}
      badge={
        <button
          onClick={runSync}
          className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300 transition hover:bg-emerald-500/20"
        >
          <RefreshCw size={10} className={syncing ? 'animate-spin' : ''} />
          {syncing ? 'Syncing…' : `Synced ${lastSync}`}
        </button>
      }
    >
      <div className="flex items-center justify-between gap-3 rounded-lg border border-line bg-night-900 px-3.5 py-2.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <Sheet size={14} className="shrink-0 text-emerald-400" />
          <p className="truncate font-mono text-[11px] text-slate-400">{financeMeta.sheetName}</p>
        </div>
        <button
          onClick={() => fileRef.current?.click()}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[11px] font-medium text-slate-400 transition hover:border-white/20 hover:text-white"
          title="Or upload a photo of your spreadsheet"
        >
          <Camera size={11} /> Upload sheet photo
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { runSync(); e.target.value = '' }} />
      </div>

      <div className="mt-4 space-y-2">
        {sortedCards.map((card) => {
          const status = paidIds.has(card.id) ? 'paid' : card.status
          const style = STATUS_STYLES[status]
          return (
            <div key={card.id} className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-white/[0.03]">
              <CreditCard size={14} className="shrink-0 text-slate-600" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">
                  {card.name} <span className="font-mono text-[10px] text-slate-600">··{card.last4}</span>
                </p>
                <p className="font-mono text-[10px] text-slate-500">
                  {formatMoney(card.amount)} · due {formatDue(card.dueDate)} · {card.owner}
                  {card.autopay ? ' · autopay' : ''}
                </p>
              </div>
              {status === 'paid' ? (
                <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold ${style.className}`}>
                  <Check size={10} /> {style.label}
                </span>
              ) : (
                <button
                  onClick={() => markPaid(card.id)}
                  className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold transition hover:opacity-80 ${style.className}`}
                >
                  {style.label}
                </button>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-5 border-t border-line pt-4">
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-display font-semibold text-white">{formatMoney(monthlyBudget.spent)}</span>
          <span className="font-mono text-[11px] text-slate-500">of {formatMoney(monthlyBudget.budget)} budget · {pct}%</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <div className="h-full rounded-full bg-gradient-to-r from-pulse-500 to-glow-500" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-3 space-y-1.5">
          {spendByCategory.map((c) => (
            <div key={c.id} className="flex items-center gap-2 text-xs">
              <span className="w-24 shrink-0 truncate text-slate-400">{c.label}</span>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/5">
                <div
                  className={`h-full rounded-full ${CATEGORY_BAR_COLORS[c.color]}`}
                  style={{ width: `${(c.amount / maxCategory) * 100}%` }}
                />
              </div>
              <span className="w-10 shrink-0 text-right font-mono text-[10px] text-slate-500">${c.amount}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 font-mono text-[10px] text-slate-600">
          + {bills.length} household bills tracked · next: field trip fee, {formatDue(bills[0].dueDate)}
        </p>
      </div>
    </TileCard>
  )
}

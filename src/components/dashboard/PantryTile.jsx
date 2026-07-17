import { useEffect, useRef, useState } from 'react'
import { ShoppingBasket, Camera, ScanLine, ReceiptText } from 'lucide-react'
import { pantry as initialPantry, pantryMeta, receiptParseResult } from '../../data/mockData'
import { STOCK_STYLES } from '../../lib/colors'
import TileCard from './TileCard'

export default function PantryTile() {
  const [items, setItems] = useState(initialPantry)
  const [receipt, setReceipt] = useState(pantryMeta.lastReceipt)
  const [scanning, setScanning] = useState(false)
  const [scanLabel, setScanLabel] = useState('')
  const fileRef = useRef(null)
  const timersRef = useRef([])

  useEffect(() => () => timersRef.current.forEach(clearTimeout), [])

  const runScan = (fileName) => {
    if (scanning) return
    setScanning(true)
    const steps = [
      [`Reading ${fileName}…`, 0],
      ['OCR: 5 line items found', 700],
      ['Matching against pantry…', 1400],
    ]
    steps.forEach(([label, delay]) =>
      timersRef.current.push(setTimeout(() => setScanLabel(label), delay))
    )
    timersRef.current.push(
      setTimeout(() => {
        setScanning(false)
        setScanLabel('')
        setReceipt({
          store: receiptParseResult.store,
          date: receiptParseResult.date,
          items: receiptParseResult.items.length,
          total: receiptParseResult.total,
        })
        setItems((prev) => {
          const newNames = receiptParseResult.items.map((i) => i.name.split(' (')[0])
          // items re-bought on the new receipt drop off the old list
          const kept = prev.filter((p) => !newNames.some((n) => p.name.startsWith(n)))
          return [...receiptParseResult.items, ...kept]
        })
      }, 2100)
    )
  }

  const onFile = (e) => {
    const file = e.target.files?.[0]
    if (file) runScan(file.name)
    e.target.value = ''
  }

  const lowOrOut = items.filter((i) => i.status !== 'stocked').length

  return (
    <TileCard
      icon={ShoppingBasket}
      title="Smart pantry"
      subtitle={`stock inferred from receipts · ${lowOrOut} need attention`}
    >
      <div className="flex items-center justify-between gap-3 rounded-lg border border-line bg-night-900 px-3.5 py-2.5">
        <div className="flex items-center gap-2.5">
          <ReceiptText size={14} className="shrink-0 text-slate-500" />
          <p className="font-mono text-[11px] text-slate-400">
            Last receipt: {receipt.store} · {receipt.items} items · ${receipt.total}
          </p>
        </div>
        <button
          onClick={() => fileRef.current?.click()}
          disabled={scanning}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-night-950 transition hover:bg-glow-300 disabled:opacity-50"
        >
          <Camera size={12} /> Scan receipt
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
      </div>

      {scanning && (
        <div className="mt-3 flex items-center gap-2.5 rounded-lg border border-pulse-500/40 bg-pulse-500/10 px-3.5 py-2.5">
          <ScanLine size={14} className="animate-pulse text-pulse-300" />
          <p className="font-mono text-[11px] text-pulse-300">{scanLabel}</p>
        </div>
      )}

      <div className="mt-4 space-y-1">
        {items.slice(0, 7).map((item) => {
          const style = STOCK_STYLES[item.status]
          return (
            <div key={item.id} className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-white/[0.03]">
              <span className={`inline-flex w-16 shrink-0 justify-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${style.className}`}>
                {style.label}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm text-slate-300">{item.name}</span>
              <span className="shrink-0 font-mono text-[10px] text-slate-600">
                {item.status === 'out' ? 'add to order' : `~${item.daysLeft}d left`}
              </span>
            </div>
          )
        })}
      </div>

      <p className="mt-4 text-xs text-slate-600">
        Out + low items auto-added to the next Instacart order · try the Scan button with any photo
      </p>
    </TileCard>
  )
}

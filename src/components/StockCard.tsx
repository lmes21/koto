import type { Stock } from '../types/stock'
import { formatPercent, formatPrice } from '../utils/format'

interface StockCardProps {
  stock: Stock
  isFavorite: boolean
  onToggleFavorite: (symbol: string) => void
}

export function StockCard({ stock, isFavorite, onToggleFavorite }: StockCardProps) {
  const isUp = stock.changePercent >= 0

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-600">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">{stock.symbol}</h2>
          <p className="text-sm text-slate-400">{stock.name}</p>
        </div>
        <button
          type="button"
          onClick={() => onToggleFavorite(stock.symbol)}
          aria-pressed={isFavorite}
          aria-label={
            isFavorite
              ? `Quitar ${stock.symbol} de favoritos`
              : `Añadir ${stock.symbol} a favoritos`
          }
          className={`text-2xl leading-none transition ${
            isFavorite ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'
          }`}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>

      <span className="mt-3 inline-block rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-300">
        {stock.sector}
      </span>

      <p className="mt-4 text-2xl font-bold">{formatPrice(stock.price)}</p>
      <p
        className={`mt-1 text-sm font-medium ${
          isUp ? 'text-emerald-400' : 'text-rose-400'
        }`}
      >
        {isUp ? '▲' : '▼'} {formatPercent(stock.changePercent)}
      </p>
    </article>
  )
}
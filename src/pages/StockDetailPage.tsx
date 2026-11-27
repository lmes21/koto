import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { PriceChart } from '../components/PriceChart'
import { getMockHistory, RANGE_DAYS, type TimeRange } from '../data/mockHistory'
import { mockStocks } from '../data/mockStocks'
import { useFavorites } from '../hooks/useFavorites'
import { formatPercent, formatPrice } from '../utils/format'

const ranges = Object.keys(RANGE_DAYS) as TimeRange[]

export function StockDetailPage() {
  const { symbol } = useParams()
  const [range, setRange] = useState<TimeRange>('1M')
  const { isFavorite, toggleFavorite } = useFavorites()

  const stock = mockStocks.find((item) => item.symbol === symbol?.toUpperCase())

  if (!stock) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-16 text-center text-slate-100">
        <p className="text-xl">No encontramos esa acción.</p>
        <Link to="/" className="mt-4 inline-block text-sky-400 hover:underline">
          Volver al panel
        </Link>
      </div>
    )
  }

  const history = getMockHistory(stock.symbol, stock.price, RANGE_DAYS[range])
  const closes = history.map((point) => point.close)
  const rangeChange = ((closes[closes.length - 1] - closes[0]) / closes[0]) * 100
  const isUp = rangeChange >= 0
  const favorite = isFavorite(stock.symbol)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Link to="/" className="text-sm text-slate-400 hover:text-slate-200">
          ← Volver al panel
        </Link>

        <header className="mt-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{stock.symbol}</h1>
            <p className="text-slate-400">
              {stock.name} · {stock.sector}
            </p>
          </div>
          <button
            type="button"
            onClick={() => toggleFavorite(stock.symbol)}
            aria-pressed={favorite}
            aria-label={
              favorite
                ? `Quitar ${stock.symbol} de favoritos`
                : `Añadir ${stock.symbol} a favoritos`
            }
            className={`text-3xl leading-none transition ${
              favorite ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'
            }`}
          >
            {favorite ? '★' : '☆'}
          </button>
        </header>

        <p className="mt-6 text-4xl font-bold">{formatPrice(stock.price)}</p>
        <p
          className={`mt-1 text-sm font-medium ${
            isUp ? 'text-emerald-400' : 'text-rose-400'
          }`}
        >
          {isUp ? '▲' : '▼'} {formatPercent(rangeChange)} en el periodo seleccionado
        </p>

        <div className="mt-6 flex gap-2" role="group" aria-label="Periodo del gráfico">
          {ranges.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setRange(item)}
              aria-pressed={range === item}
              className={`rounded-full px-3 py-1 text-sm transition ${
                range === item
                  ? 'bg-sky-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <section className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <PriceChart data={history} isUp={isUp} />
        </section>

        <dl className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="rounded-xl bg-slate-900 p-4">
            <dt className="text-xs text-slate-400">Mínimo</dt>
            <dd className="mt-1 font-semibold">{formatPrice(Math.min(...closes))}</dd>
          </div>
          <div className="rounded-xl bg-slate-900 p-4">
            <dt className="text-xs text-slate-400">Máximo</dt>
            <dd className="mt-1 font-semibold">{formatPrice(Math.max(...closes))}</dd>
          </div>
          <div className="rounded-xl bg-slate-900 p-4">
            <dt className="text-xs text-slate-400">Variación hoy</dt>
            <dd className="mt-1 font-semibold">{formatPercent(stock.changePercent)}</dd>
          </div>
        </dl>

        <p className="mt-8 text-center text-xs text-slate-500">
          Datos de ejemplo. Esto no es consejo de inversión.
        </p>
      </div>
    </div>
  )
}
import { StockCard } from './components/StockCard'
import { mockStocks } from './data/mockStocks'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight">Koto</h1>
        <p className="mt-1 text-slate-400">Panel de acciones</p>
      </header>

      <main className="mx-auto grid max-w-6xl gap-4 px-4 pb-12 sm:grid-cols-2 lg:grid-cols-3">
        {mockStocks.map((stock) => (
          <StockCard key={stock.symbol} stock={stock} />
        ))}
      </main>
    </div>
  )
}

export default App
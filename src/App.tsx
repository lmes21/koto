import { useState } from 'react'
import { Pagination } from './components/Pagination'
import { SearchBar } from './components/SearchBar'
import { SectorFilter } from './components/SectorFilter'
import { StockCard } from './components/StockCard'
import { mockStocks } from './data/mockStocks'
import { useDebounce } from './hooks/useDebounce'
import { useFavorites } from './hooks/useFavorites'
import { filterStocks } from './utils/filterStocks'
import { paginate, totalPages } from './utils/paginate'

const PAGE_SIZE = 6
const sectors = [...new Set(mockStocks.map((stock) => stock.sector))]

function App() {
  const [query, setQuery] = useState('')
  const [sector, setSector] = useState('Todos')
  const [page, setPage] = useState(1)
  const debouncedQuery = useDebounce(query, 300)
  const { isFavorite, toggleFavorite } = useFavorites()

  const filtered = filterStocks(mockStocks, debouncedQuery, sector)
  const pages = totalPages(filtered.length, PAGE_SIZE)
  const currentPage = Math.min(page, pages)
  const visibleStocks = paginate(filtered, currentPage, PAGE_SIZE)

  const handleQueryChange = (value: string) => {
    setQuery(value)
    setPage(1)
  }

  const handleSectorChange = (value: string) => {
    setSector(value)
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight">Koto</h1>
        <p className="mt-1 text-slate-400">Panel de acciones</p>
      </header>

      <section className="mx-auto max-w-6xl space-y-4 px-4 pb-6">
        <SearchBar value={query} onChange={handleQueryChange} />
        <SectorFilter
          sectors={sectors}
          selected={sector}
          onSelect={handleSectorChange}
        />
      </section>

      <main className="mx-auto max-w-6xl px-4 pb-12">
        {visibleStocks.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-800 p-8 text-center text-slate-400">
            No hay acciones que coincidan con tu búsqueda.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleStocks.map((stock) => (
              <StockCard
                key={stock.symbol}
                stock={stock}
                isFavorite={isFavorite(stock.symbol)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}

        <Pagination
          page={currentPage}
          totalPages={pages}
          onPageChange={setPage}
        />
      </main>
    </div>
  )
}

export default App
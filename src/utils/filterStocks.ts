import type { Stock } from '../types/stock'

export function filterStocks(
  stocks: Stock[],
  query: string,
  sector: string,
): Stock[] {
  const q = query.trim().toLowerCase()

  return stocks.filter((stock) => {
    const matchesQuery =
      q === '' ||
      stock.symbol.toLowerCase().includes(q) ||
      stock.name.toLowerCase().includes(q)
    const matchesSector = sector === 'Todos' || stock.sector === sector

    return matchesQuery && matchesSector
  })
}
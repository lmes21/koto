import type { Stock, Trend } from '../types/stock'

interface Filters {
  query: string
  sector: string
  trend: Trend
}

export function filterStocks(stocks: Stock[], filters: Filters): Stock[] {
  const q = filters.query.trim().toLowerCase()

  return stocks.filter((stock) => {
    const matchesQuery =
      q === '' ||
      stock.symbol.toLowerCase().includes(q) ||
      stock.name.toLowerCase().includes(q)
    const matchesSector =
      filters.sector === 'Todos' || stock.sector === filters.sector
    const matchesTrend =
      filters.trend === 'all' ||
      (filters.trend === 'up' ? stock.changePercent >= 0 : stock.changePercent < 0)

    return matchesQuery && matchesSector && matchesTrend
  })
}
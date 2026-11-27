export interface Stock {
  symbol: string
  name: string
  sector: string
  price: number
  change: number
  changePercent: number
}

export interface PricePoint {
  date: string
  close: number
}

export type Trend = 'all' | 'up' | 'down'
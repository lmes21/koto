import type { PricePoint } from '../types/stock'

export type TimeRange = '1S' | '1M' | '3M' | '1A'

export const RANGE_DAYS: Record<TimeRange, number> = {
  '1S': 7,
  '1M': 30,
  '3M': 90,
  '1A': 365,
}

function hash(text: string): number {
  let h = 0
  for (const char of text) h = (h * 31 + char.charCodeAt(0)) >>> 0
  return h
}

function seededRandom(seed: number) {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}

export function getMockHistory(
  symbol: string,
  currentPrice: number,
  days: number,
): PricePoint[] {
  const random = seededRandom(hash(symbol))
  const points: PricePoint[] = []
  const today = new Date()
  let price = currentPrice

  for (let i = 0; i < days; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    points.push({
      date: date.toISOString().slice(0, 10),
      close: Number(price.toFixed(2)),
    })
    price = price * (1 + (random() - 0.5) * 0.04)
  }

  return points.reverse()
}
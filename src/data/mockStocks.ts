import type { Stock } from '../types/stock'

export const mockStocks: Stock[] = [
  { symbol: 'NVDA', name: 'NVIDIA', sector: 'Tecnología', price: 142.5, change: 3.1, changePercent: 2.22 },
  { symbol: 'AMD', name: 'Advanced Micro Devices', sector: 'Tecnología', price: 128.4, change: -1.8, changePercent: -1.38 },
  { symbol: 'AAPL', name: 'Apple', sector: 'Tecnología', price: 231.2, change: 0.9, changePercent: 0.39 },
  { symbol: 'MSFT', name: 'Microsoft', sector: 'Tecnología', price: 428.7, change: 4.3, changePercent: 1.01 },
  { symbol: 'GOOGL', name: 'Alphabet', sector: 'Comunicaciones', price: 176.9, change: -2.2, changePercent: -1.23 },
  { symbol: 'META', name: 'Meta Platforms', sector: 'Comunicaciones', price: 585.3, change: 6.7, changePercent: 1.16 },
  { symbol: 'AMZN', name: 'Amazon', sector: 'Consumo', price: 201.6, change: 1.4, changePercent: 0.7 },
  { symbol: 'TSLA', name: 'Tesla', sector: 'Consumo', price: 342.1, change: -8.5, changePercent: -2.42 },
  { symbol: 'JPM', name: 'JPMorgan Chase', sector: 'Finanzas', price: 245.8, change: 0.4, changePercent: 0.16 },
  { symbol: 'XOM', name: 'Exxon Mobil', sector: 'Energía', price: 114.2, change: -0.6, changePercent: -0.52 },
]
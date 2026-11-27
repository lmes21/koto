import type { Trend } from '../types/stock'

interface TrendFilterProps {
  selected: Trend
  onSelect: (trend: Trend) => void
}

const options: { value: Trend; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'up', label: '▲ Suben' },
  { value: 'down', label: '▼ Bajan' },
]

export function TrendFilter({ selected, onSelect }: TrendFilterProps) {
  return (
    <div
      className="flex gap-2"
      role="group"
      aria-label="Filtrar por tendencia del día"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onSelect(option.value)}
          aria-pressed={selected === option.value}
          className={`rounded-full px-3 py-1 text-sm transition ${
            selected === option.value
              ? 'bg-sky-500 text-slate-950'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
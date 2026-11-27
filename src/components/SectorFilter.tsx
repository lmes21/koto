interface SectorFilterProps {
  sectors: string[]
  selected: string
  onSelect: (sector: string) => void
}

export function SectorFilter({ sectors, selected, onSelect }: SectorFilterProps) {
  const options = ['Todos', ...sectors]

  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filtrar por sector"
    >
      {options.map((sector) => (
        <button
          key={sector}
          type="button"
          onClick={() => onSelect(sector)}
          aria-pressed={selected === sector}
          className={`rounded-full px-3 py-1 text-sm transition ${
            selected === sector
              ? 'bg-sky-500 text-slate-950'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          {sector}
        </button>
      ))}
    </div>
  )
}
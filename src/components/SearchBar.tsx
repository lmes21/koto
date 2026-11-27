interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Buscar por nombre o ticker (NVDA, AMD...)"
      aria-label="Buscar acción"
      className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm placeholder:text-slate-500 focus:border-sky-500 focus:outline-none"
    />
  )
}
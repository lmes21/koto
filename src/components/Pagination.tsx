interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const buttonClass =
    'rounded-lg bg-slate-800 px-4 py-2 text-sm transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40'

  return (
    <nav
      className="mt-8 flex items-center justify-center gap-4"
      aria-label="Paginación"
    >
      <button
        type="button"
        className={buttonClass}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Anterior
      </button>
      <span className="text-sm text-slate-400">
        Página {page} de {totalPages}
      </span>
      <button
        type="button"
        className={buttonClass}
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Siguiente
      </button>
    </nav>
  )
}
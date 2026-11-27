import { useEffect, useState } from 'react'

const STORAGE_KEY = 'koto:favorites'

function loadFavorites(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : []
  } catch {
    return []
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(loadFavorites)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // si el almacenamiento falla, la app sigue funcionando sin guardar
    }
  }, [favorites])

  const isFavorite = (symbol: string) => favorites.includes(symbol)

  const toggleFavorite = (symbol: string) => {
    setFavorites((current) =>
      current.includes(symbol)
        ? current.filter((item) => item !== symbol)
        : [...current, symbol],
    )
  }

  return { favorites, isFavorite, toggleFavorite }
}
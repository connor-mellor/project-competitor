// src/themes/ThemeProvider.tsx
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { ThemeContext } from './ThemeContext'
import { themes, type ThemeId } from './themes'

const STORAGE_KEY = 'theme'

function readSaved(): ThemeId {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && saved in themes) return saved as ThemeId
  } catch {
    /* storage unavailable */
  }
  return 'default'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState<ThemeId>(readSaved)

  useEffect(() => {
    document.documentElement.dataset.theme = id
    try {
      localStorage.setItem(STORAGE_KEY, id)
    } catch {
      /* ignore */
    }
  }, [id])

  const value = useMemo(() => ({ theme: themes[id], setTheme: setId }), [id])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
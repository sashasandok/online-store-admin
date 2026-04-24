import React from 'react'
import { ThemeContext } from './context'
import type { ThemeMode, ThemeContextValue } from './types'

const STORAGE_KEY = 'theme'

const applyThemeToDom = (mode: ThemeMode) => {
  const root = document.documentElement

  if (mode === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }

  // Improves native form controls + scrollbar colors.
  root.style.colorScheme = mode
}

const getInitialMode = (): ThemeMode => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'light' || saved === 'dark') return saved

  const prefersDark = window.matchMedia?.(
    '(prefers-color-scheme: dark)'
  ).matches
  return prefersDark ? 'dark' : 'light'
}

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [mode, setModeState] = React.useState<ThemeMode>(() => getInitialMode())

  const setMode = React.useCallback((next: ThemeMode) => {
    setModeState(next)
    localStorage.setItem(STORAGE_KEY, next)
    applyThemeToDom(next)
  }, [])

  const toggle = React.useCallback(() => {
    setMode(mode === 'dark' ? 'light' : 'dark')
  }, [mode, setMode])

  // Apply theme on mount and whenever mode changes
  React.useEffect(() => {
    applyThemeToDom(mode)
  }, [mode])

  // If user didn't pick a theme manually, keep in sync with OS changes
  React.useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return

    const mql = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!mql) return

    const onChange = (e: MediaQueryListEvent) => {
      setModeState(e.matches ? 'dark' : 'light')
    }

    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  const value = React.useMemo<ThemeContextValue>(
    () => ({ mode, setMode, toggle }),
    [mode, setMode, toggle]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

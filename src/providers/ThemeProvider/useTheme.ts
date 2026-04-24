import React from 'react'
import { ThemeContext } from './context.ts'
import type { ThemeMode } from './types.ts'

export const useTheme = () => {
  const ctx = React.useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}

export type { ThemeMode }

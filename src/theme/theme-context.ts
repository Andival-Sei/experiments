import { createContext, useContext } from 'react'

export type Theme = 'light' | 'dark'

export interface ThemeContextValue {
  theme: Theme
  systemTheme: Theme
  hasUserPreference: boolean
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  resetToSystem: () => void
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme должен вызываться внутри ThemeProvider')
  }

  return context
}

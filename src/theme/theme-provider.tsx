import { useCallback, useEffect, useMemo, useRef, useState, type PropsWithChildren } from 'react'

import { ThemeContext, type Theme, type ThemeContextValue } from './theme-context'

const STORAGE_KEY = 'experiments:theme'
const DARK_QUERY = '(prefers-color-scheme: dark)'

function getSystemTheme(): Theme {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'light'
  }

  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light'
}

function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') {
      return stored
    }
  } catch {
    // Игнорируем ошибки доступа к localStorage, например, в режиме приватного окна.
  }

  return null
}

function setDocumentTheme(theme: Theme) {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const storedTheme = getStoredTheme()
  const initialSystemTheme = getSystemTheme()
  const initialTheme = storedTheme ?? initialSystemTheme

  const [theme, setThemeState] = useState<Theme>(initialTheme)
  const [systemTheme, setSystemTheme] = useState<Theme>(initialSystemTheme)
  const [hasUserPreference, setHasUserPreference] = useState(storedTheme !== null)
  const userPreferenceRef = useRef(hasUserPreference)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      setDocumentTheme(initialTheme)
      return
    }

    const media = window.matchMedia(DARK_QUERY)

    setDocumentTheme(initialTheme)

    const handleChange = (event: MediaQueryListEvent) => {
      const nextSystemTheme: Theme = event.matches ? 'dark' : 'light'
      setSystemTheme(nextSystemTheme)

      if (!userPreferenceRef.current) {
        setThemeState(nextSystemTheme)
      }
    }

    media.addEventListener('change', handleChange)

    return () => {
      media.removeEventListener('change', handleChange)
    }
  }, [initialTheme])

  useEffect(() => {
    userPreferenceRef.current = hasUserPreference
  }, [hasUserPreference])

  useEffect(() => {
    setDocumentTheme(theme)

    if (typeof window === 'undefined') {
      return
    }

    try {
      if (hasUserPreference) {
        window.localStorage.setItem(STORAGE_KEY, theme)
      } else {
        window.localStorage.removeItem(STORAGE_KEY)
      }
    } catch {
      // Игнорируем ошибки доступа к localStorage.
    }
  }, [theme, hasUserPreference])

  const setTheme = useCallback((nextTheme: Theme) => {
    setHasUserPreference(true)
    userPreferenceRef.current = true
    setThemeState(nextTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    setHasUserPreference(true)
    userPreferenceRef.current = true
    setThemeState((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }, [])

  const resetToSystem = useCallback(() => {
    setHasUserPreference(false)
    userPreferenceRef.current = false
    setThemeState(systemTheme)
  }, [systemTheme])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      systemTheme,
      hasUserPreference,
      setTheme,
      toggleTheme,
      resetToSystem,
    }),
    [theme, systemTheme, hasUserPreference, setTheme, toggleTheme, resetToSystem],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

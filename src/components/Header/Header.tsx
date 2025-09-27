import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import styles from './Header.module.scss'
import { cn } from '../../lib/cn'
import { useTheme } from '../../theme/theme-context'

const navigation: { label: string; path: string }[] = [
  { label: 'Главная', path: '/' },
  { label: 'Контакты', path: '/contacts' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  const nextTheme = theme === 'dark' ? 'светлую' : 'тёмную'
  const themeToggleAccessibleLabel = `Переключить тему на ${nextTheme}`

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.brand} to="/" onClick={closeMenu}>
          <span aria-hidden className={styles.logo} />
          <span className={styles.brandName}>Experiments</span>
        </Link>

        <nav
          id="primary-navigation"
          aria-label="Навигация по страницам"
          data-open={isMenuOpen ? 'true' : 'false'}
          className={cn(styles.nav, isMenuOpen && styles.navOpen)}
        >
          <ul className={styles.navList}>
            {navigation.map((item) => {
              const isActive = location.pathname === item.path

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={closeMenu}
                    className={cn(styles.navLink, isActive && styles.navLinkActive)}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <button
          type="button"
          className={styles.themeToggle}
          onClick={() => {
            toggleTheme()
          }}
          aria-label={themeToggleAccessibleLabel}
        >
          <span className={styles.themeToggleTrack} data-mode={theme} aria-hidden="true">
            <span className={cn(styles.themeToggleIcon, styles.themeToggleIconSun)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4a1 1 0 0 1-1-1v-1.07a1 1 0 1 1 2 0V21a1 1 0 0 1-1 1Zm0-18a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm10-1h-1a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2ZM4 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm18 0a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1ZM5.64 18.36a1 1 0 0 1-1.41 0l-.71-.7a1 1 0 1 1 1.41-1.42l.71.71a1 1 0 0 1 0 1.41Zm14.14 0-.71-.7a1 1 0 1 1 1.41-1.42l.71.71a1 1 0 0 1-1.41 1.41ZM4.93 6.34l-.71-.7a1 1 0 0 1 1.41-1.42l.71.71A1 1 0 1 1 4.93 6.34Zm13.44-.71a1 1 0 1 1 1.41-1.42l.71.71a1 1 0 0 1-1.41 1.41Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className={cn(styles.themeToggleIcon, styles.themeToggleIconMoon)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79Z" fill="currentColor" />
              </svg>
            </span>
            <span
              className={cn(
                styles.themeToggleThumb,
                theme === 'dark' && styles.themeToggleThumbActive,
              )}
            />
          </span>
          <span className={styles.srOnly}>{themeToggleAccessibleLabel}</span>
        </button>

        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          className={styles.toggle}
          onClick={() => {
            setIsMenuOpen((prev) => !prev)
          }}
        >
          <span className={styles.toggleLine} />
          <span className={styles.toggleLine} />
          <span className={styles.toggleLine} />
          <span className={styles.srOnly}>Навигация</span>
        </button>
      </div>
    </header>
  )
}

export default Header

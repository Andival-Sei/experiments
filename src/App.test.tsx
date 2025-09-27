import { HelmetProvider } from '@dr.pogodin/react-helmet'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

import App from './App'
import { RootStoreProvider } from './stores/root-store-provider'
import { ThemeProvider } from './theme/theme-provider'

// Набор компонентных тестов, проверяющих ключевые элементы новой главной страницы.

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  })
})

beforeEach(() => {
  window.scrollTo = vi.fn()
  window.localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
  document.documentElement.style.colorScheme = ''
})

describe('Приложение', () => {
  it('рендерит страницы, переключает тему и навигацию', async () => {
    render(
      <HelmetProvider>
        <RootStoreProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </RootStoreProvider>
      </HelmetProvider>,
    )

    await waitFor(() => {
      expect(document.title).toBe('Experiments — современный фронтенд-старт')
    })

    expect(
      screen.getByRole('heading', { level: 1, name: /стартуйте продукт быстро/i }),
    ).toBeInTheDocument()

    const nav = screen.getByRole('navigation', { name: /навигация по страницам/i })
    expect(nav).toBeInTheDocument()

    const navLinks = [
      { name: 'Главная', href: '/' },
      { name: 'Контакты', href: '/contacts' },
    ]

    navLinks.forEach(({ name, href }) => {
      expect(screen.getByRole('link', { name })).toHaveAttribute('href', href)
    })

    const themeToggle = screen.getByRole('button', {
      name: /переключить тему на тёмную|переключить тему на светлую/i,
    })
    expect(themeToggle).toBeInTheDocument()

    const user = userEvent.setup()
    await user.click(themeToggle)

    expect(document.documentElement.dataset.theme).toBe('dark')

    await user.click(screen.getByRole('link', { name: 'Контакты' }))

    await waitFor(() => {
      expect(document.title).toBe('Связаться с Experiments')
    })

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /всегда открыты к разговору о продукте/i,
      }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'Главная' }))

    await waitFor(() => {
      expect(document.title).toBe('Experiments — современный фронтенд-старт')
    })

    expect(
      screen.getByRole('heading', { level: 1, name: /стартуйте продукт быстро/i }),
    ).toBeInTheDocument()
  })
})

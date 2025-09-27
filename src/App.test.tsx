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
      expect(document.title).toBe('Experiments — современный фронтенд-стек')
    })

    expect(
      screen.getByRole('heading', { level: 1, name: /проект на передовых технологиях/i }),
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
      expect(document.title).toBe('Связаться с командой Experiments')
    })

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /связаться с командой experiments/i,
      }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'Главная' }))

    await waitFor(() => {
      expect(document.title).toBe('Experiments — современный фронтенд-стек')
    })

    expect(
      screen.getByRole('heading', { level: 1, name: /проект на передовых технологиях/i }),
    ).toBeInTheDocument()
  })

  it('отображает секции технологий на главной странице', () => {
    render(
      <HelmetProvider>
        <RootStoreProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </RootStoreProvider>
      </HelmetProvider>,
    )

    // Проверяем заголовки секций
    expect(
      screen.getByRole('heading', { level: 2, name: /React 19 \+ TypeScript \+ Vite/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: /MobX для реактивного состояния/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: /Sass \+ CSS Modules/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: /Полное покрытие тестами/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: /Автоматизация и качество кода/i }),
    ).toBeInTheDocument()

    // Проверяем описания технологий
    expect(
      screen.getByText(/Самая актуальная версия React с поддержкой новых возможностей/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Простое и мощное управление состоянием через реактивное программирование/i),
    ).toBeInTheDocument()
  })

  it('отображает каналы связи на странице контактов', async () => {
    render(
      <HelmetProvider>
        <RootStoreProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </RootStoreProvider>
      </HelmetProvider>,
    )

    const user = userEvent.setup()
    await user.click(screen.getByRole('link', { name: 'Контакты' }))

    await waitFor(() => {
      expect(document.title).toBe('Связаться с командой Experiments')
    })

    // Проверяем наличие всех каналов связи
    expect(screen.getByRole('heading', { level: 3, name: 'Email' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Telegram' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'VK' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Discord' })).toBeInTheDocument()

    // Проверяем ссылки
    expect(screen.getByRole('link', { name: 'Написать письмо' })).toHaveAttribute(
      'href',
      'mailto:contact@experiments.dev',
    )
    expect(screen.getByRole('link', { name: 'Открыть чат' })).toHaveAttribute(
      'href',
      'https://t.me/experiments_dev',
    )
  })
})

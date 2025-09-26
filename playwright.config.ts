import { defineConfig, devices } from '@playwright/test'

// Конфигурация Playwright для запуска e2e-тестов в разных браузерах.
const env = process.env

// Преобразует значение переменной окружения в число порта с запасным значением.
const resolvePort = (value: string | undefined, fallback: number): number => {
  if (value === undefined) {
    return fallback
  }

  const numeric = Number.parseInt(value, 10)
  return Number.isFinite(numeric) ? numeric : fallback
}

// Возвращает валидное имя хоста, игнорируя пустые строки.
const resolveHost = (value: string | undefined, fallback: string): string => {
  if (value === undefined) {
    return fallback
  }

  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : fallback
}

const PORT = resolvePort(env.PLAYWRIGHT_PORT, 5173)
const HOST = resolveHost(env.PLAYWRIGHT_HOST, 'localhost')
const isCi = env.CI === 'true'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: isCi,
  retries: isCi ? 2 : 0,
  workers: isCi ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: `http://${HOST}:${String(PORT)}`,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: isCi ? 'retain-on-failure' : 'on-first-retry',
  },
  projects: [
    {
      name: 'Desktop Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Desktop Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Desktop Safari',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: `pnpm dev -- --host ${HOST} --port ${String(PORT)}`,
    url: `http://${HOST}:${String(PORT)}`,
    reuseExistingServer: !isCi,
    timeout: 120_000,
  },
})

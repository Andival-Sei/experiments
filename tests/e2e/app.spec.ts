import { expect, test } from '@playwright/test'

test.describe('Приложение', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })
  test('отображает главную страницу и навигацию', async ({ page }) => {
    await expect(page).toHaveTitle('Experiments — современный фронтенд-стек')
    await expect(
      page.getByRole('heading', { level: 1, name: /проект на передовых технологиях/i }),
    ).toBeVisible()

    const navigation = page.getByRole('navigation', { name: /навигация по страницам/i })
    await expect(navigation).toBeVisible()
    await expect(navigation.getByRole('link', { name: 'Главная' })).toHaveAttribute('href', '/')
    await expect(navigation.getByRole('link', { name: 'Контакты' })).toHaveAttribute(
      'href',
      '/contacts',
    )
  })

  test('переходит на страницу контактов и обратно', async ({ page }) => {
    await page.getByRole('link', { name: 'Контакты' }).click()

    await expect(page).toHaveURL(/\/contacts$/)
    await expect(page).toHaveTitle('Связаться с командой Experiments')
    await expect(
      page.getByRole('heading', { level: 1, name: /связаться с командой experiments/i }),
    ).toBeVisible()

    await page.getByRole('link', { name: 'Главная' }).click()

    await expect(page).toHaveURL(/\/$/)
    await expect(page).toHaveTitle('Experiments — современный фронтенд-стек')
  })

  test('сохраняет выбранную тему после перезагрузки', async ({ page }) => {
    const themeToggle = page.getByRole('button', {
      name: /переключить тему на тёмную|переключить тему на светлую/i,
    })
    await themeToggle.click()

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')

    await page.reload()
    await expect
      .poll(async () => page.evaluate(() => document.documentElement.dataset.theme))
      .toBe('dark')
  })
})

test.describe('Мобильный хедер', () => {
  test.use({ viewport: { width: 600, height: 900 } })

  test('раскрывает бургер-меню', async ({ page }) => {
    await page.goto('/')

    const navigation = page.getByRole('navigation', { name: /навигация по страницам/i })
    await expect(navigation).toHaveAttribute('data-open', 'false')

    await page.getByRole('button', { name: 'Навигация' }).click()

    await expect(navigation).toHaveAttribute('data-open', 'true')
    await expect(navigation).toBeVisible()
    await expect(navigation.getByRole('link', { name: 'Главная' })).toBeVisible()
    await expect(navigation.getByRole('link', { name: 'Контакты' })).toBeVisible()

    const shouldCapture =
      (
        globalThis as typeof globalThis & {
          process?: { env?: Record<string, string | undefined> }
        }
      ).process?.env?.PLAYWRIGHT_MOBILE_SHOT === '1'

    if (shouldCapture) {
      await page.screenshot({ path: 'test-results/mobile-menu.png', fullPage: false })
    }
  })
})

test.describe('Страница контактов', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contacts')
  })

  test('отображает все каналы связи', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 3, name: 'Email' })).toBeVisible()
    await expect(page.getByRole('heading', { level: 3, name: 'Telegram' })).toBeVisible()
    await expect(page.getByRole('heading', { level: 3, name: 'VK' })).toBeVisible()
    await expect(page.getByRole('heading', { level: 3, name: 'Discord' })).toBeVisible()
  })

  test('проверяет ссылки на социальные сети', async ({ page }) => {
    const emailLink = page.getByRole('link', { name: 'Написать письмо' })
    await expect(emailLink).toHaveAttribute('href', 'mailto:contact@experiments.dev')

    const telegramLink = page.getByRole('link', { name: 'Открыть чат' })
    await expect(telegramLink).toHaveAttribute('href', 'https://t.me/experiments_dev')

    const vkLink = page.getByRole('link', { name: 'Перейти в VK' })
    await expect(vkLink).toHaveAttribute('href', 'https://vk.com/experiments_dev')

    const discordLink = page.getByRole('link', { name: 'Присоединиться' })
    await expect(discordLink).toHaveAttribute('href', 'https://discord.gg/experiments-dev')
  })

  test('форма обратной связи работает', async ({ page }) => {
    await page.fill('input[name="name"]', 'Тестовый пользователь')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('textarea[name="message"]', 'Тестовое сообщение')

    await page.click('button[type="submit"]')

    await expect(page.getByText('Спасибо за вопрос! Мы ответим в ближайшее время.')).toBeVisible()
  })
})

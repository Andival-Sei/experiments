import { expect, test } from '@playwright/test'

test.describe('Приложение', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })
  test('отображает главную страницу и навигацию', async ({ page }) => {
    await expect(page).toHaveTitle('Experiments — современный фронтенд-старт')
    await expect(
      page.getByRole('heading', { level: 1, name: /стартуйте продукт быстро/i }),
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
    await expect(page).toHaveTitle('Связаться с Experiments')
    await expect(
      page.getByRole('heading', { level: 1, name: /всегда открыты к разговору о продукте/i }),
    ).toBeVisible()

    await page.getByRole('link', { name: 'Главная' }).click()

    await expect(page).toHaveURL(/\/$/)
    await expect(page).toHaveTitle('Experiments — современный фронтенд-старт')
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

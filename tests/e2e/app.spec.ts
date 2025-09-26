import { expect, test, type Page } from '@playwright/test'

// Универсальный шаблон для поиска кнопки по тексту независимо от значения счётчика.
const COUNTER_BUTTON_LABEL = /значение счётчика: \d+/i

/**
 * Открывает главную страницу и убеждается, что заголовок успешно отрисован.
 */
const navigateToHome = async (page: Page) => {
  await page.goto('/')
  await expect(page).toHaveTitle('Vite + React — демо счётчика')
  await expect(page.getByRole('heading', { name: /vite \+ react/i })).toBeVisible()
}

test.describe('Приложение', () => {
  test('увеличивает значение счётчика при нажатии', async ({ page }) => {
    await navigateToHome(page)

    const counterButton = page.getByRole('button', { name: COUNTER_BUTTON_LABEL })

    await expect(counterButton).toHaveText(/значение счётчика: 0/i)
    await counterButton.click()
    await expect(counterButton).toHaveText(/значение счётчика: 1/i)
  })

  test('открывает внешнюю документацию по клику на логотип', async ({ page }) => {
    await navigateToHome(page)

    const viteLink = page.getByRole('link', { name: /логотип vite/i })
    await expect(viteLink).toHaveAttribute('href', 'https://vite.dev')
  })
})

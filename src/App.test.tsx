import { HelmetProvider } from '@dr.pogodin/react-helmet'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import App from './App'
import { RootStoreProvider } from './stores/root-store-provider'

// Набор компонентных тестов, проверяющих работу счётчика в демо-приложении.

describe('Приложение', () => {
  it('увеличивает счётчик при нажатии на кнопку', async () => {
    const user = userEvent.setup()
    render(
      <HelmetProvider>
        <RootStoreProvider>
          <App />
        </RootStoreProvider>
      </HelmetProvider>,
    )

    await waitFor(() => {
      expect(document.title).toBe('Vite + React — демо счётчика')
    })

    const button = screen.getByRole('button', { name: /значение счётчика: 0/i })
    expect(button).toHaveTextContent(/значение счётчика: 0/i)
    await user.click(button)

    expect(button).toHaveTextContent(/значение счётчика: 1/i)
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import App from './App'

// Набор компонентных тестов, проверяющих работу счётчика в демо-приложении.

describe('Приложение', () => {
  it('увеличивает счётчик при нажатии на кнопку', async () => {
    const user = userEvent.setup()
    render(<App />)

    const button = screen.getByRole('button', { name: /значение счётчика: 0/i })
    expect(button).toHaveTextContent(/значение счётчика: 0/i)
    await user.click(button)

    expect(button).toHaveTextContent(/значение счётчика: 1/i)
  })
})

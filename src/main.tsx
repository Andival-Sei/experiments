import { HelmetProvider } from '@dr.pogodin/react-helmet'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import './index.scss'
import { RootStoreProvider } from './stores/root-store-provider'

/**
 * Находит корневой DOM-узел и монтирует в него React-приложение.
 * Бросает исключение с понятным описанием, если контейнер не найден.
 */
const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Не удалось найти элемент с идентификатором "root" для монтирования приложения')
}

createRoot(rootElement).render(
  <StrictMode>
    <HelmetProvider>
      <RootStoreProvider>
        <App />
      </RootStoreProvider>
    </HelmetProvider>
  </StrictMode>,
)

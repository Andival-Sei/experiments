import { useState } from 'react'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'

/**
 * Главный компонент приложения с простым счётчиком и ссылками на документацию.
 */
function App() {
  // Состояние хранит текущее значение счётчика, отображаемое на кнопке.
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Логотип Vite" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="Логотип React" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => {
            setCount((value) => value + 1)
          }}
        >
          Значение счётчика: {count}
        </button>
        <p>
          Измените файл <code>src/App.tsx</code> и сохраните его, чтобы увидеть горячую перезагрузку
        </p>
      </div>
      <p className="read-the-docs">
        Нажмите на логотипы Vite и React, чтобы открыть их документацию
      </p>
    </>
  )
}

export default App

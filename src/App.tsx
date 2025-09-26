import { Helmet } from '@dr.pogodin/react-helmet'
import { observer } from 'mobx-react-lite'

import viteLogo from '/vite.svg'

import './App.css'
import reactLogo from './assets/react.svg'
import { useCounterStore } from './stores/root-store-context'

/**
 * Главный компонент приложения с простым счётчиком и ссылками на документацию.
 */
const App = observer(function App() {
  // Храним состояние счётчика в MobX-сторе, чтобы оно было доступно всему приложению.
  const counterStore = useCounterStore()

  return (
    <>
      <Helmet prioritizeSeoTags>
        <title>Vite + React — демо счётчика</title>
        <meta
          name="description"
          content="Пример приложения на React 19 с Vite, демонстрирующий интеграцию счётчика и react-helmet."
        />
      </Helmet>
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
            counterStore.increment()
          }}
        >
          Значение счётчика: {counterStore.count}
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
})

export default App

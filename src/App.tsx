import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'

import styles from './App.module.scss'
import { Header } from './components/Header/Header'
import { ContactsPage } from './pages/ContactsPage/ContactsPage'
import { HomePage } from './pages/HomePage/HomePage'

export function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </div>
        </main>
        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <span>&copy; {new Date().getFullYear()} Experiments</span>
            <a href="https://github.com/Andival-Sei/experiments" target="_blank" rel="noreferrer">
              GitHub репозиторий
            </a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return
    }

    if (location.hash) {
      const targetId = location.hash.slice(1)

      const scrollToTarget = () => {
        const element = document.getElementById(targetId)

        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }

      if (typeof window.requestAnimationFrame === 'function') {
        window.requestAnimationFrame(scrollToTarget)
      } else {
        window.setTimeout(scrollToTarget, 0)
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location])

  return null
}

export default App

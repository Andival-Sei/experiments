import { createContext, useContext } from 'react'

import { CounterStore } from './counter.store'
import { RootStore } from './root-store'

export const RootStoreContext = createContext<RootStore | null>(null)

/**
 * Достаёт корневой стор из контекста и бросает исключение, если провайдер отсутствует в дереве.
 */
export function useRootStore(): RootStore {
  const store = useContext(RootStoreContext)

  if (!store) {
    throw new Error('RootStoreProvider отсутствует в дереве компонентов')
  }

  return store
}

/**
 * Утилитарный хук для быстрого доступа к стору счётчика.
 */
export function useCounterStore(): CounterStore {
  return useRootStore().counterStore
}

import { type ReactNode, useMemo } from 'react'

import { RootStore } from './root-store'
import { RootStoreContext } from './root-store-context'

interface RootStoreProviderProps {
  children?: ReactNode
}

/**
 * Провайдер, создающий и предоставляющий единый экземпляр {@link RootStore} приложению.
 */
export function RootStoreProvider({ children }: RootStoreProviderProps) {
  const store = useMemo(() => new RootStore(), [])

  return <RootStoreContext.Provider value={store}>{children}</RootStoreContext.Provider>
}

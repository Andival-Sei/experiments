import { CounterStore } from './counter.store'

/**
 * Корневой стор, агрегирующий все store-примитивы приложения.
 */
export class RootStore {
  readonly counterStore: CounterStore

  constructor() {
    this.counterStore = new CounterStore()
  }
}

import { makeAutoObservable } from 'mobx'

/**
 * Стор счётчика, отвечающий за хранение и изменение текущего значения.
 */
export class CounterStore {
  /**
   * Текущее значение счётчика.
   */
  count = 0

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  /**
   * Увеличивает значение счётчика на единицу.
   */
  increment() {
    this.count += 1
  }
}

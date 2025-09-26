import { describe, expect, it } from 'vitest'

import { CounterStore } from './counter.store'

describe('CounterStore', () => {
  it('увеличивает значение счётчика на единицу', () => {
    const store = new CounterStore()

    expect(store.count).toBe(0)
    store.increment()

    expect(store.count).toBe(1)
  })
})

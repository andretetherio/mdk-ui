import { describe, expect, it } from 'vitest'
import { store } from '../store'

describe('redux store', () => {
  it('should initialize store', () => {
    expect(store).toBeDefined()
    expect(store.getState).toBeDefined()
    expect(store.dispatch).toBeDefined()
  })

  it('should have notifications reducer', () => {
    const state = store.getState()
    expect(state.notifications).toBeDefined()
    expect(state.notifications.count).toBe(0)
  })

  it('should handle actions', () => {
    const state = store.getState()
    expect(state.notifications).toEqual({ count: 0 })
  })
})

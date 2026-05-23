import { describe, it, expect } from 'vitest'
import { computeReadiness } from './readiness.js'
import { createInitialSquad } from './content.js'

describe('computeReadiness', () => {
  it('returns 100 when all template slots filled', () => {
    const squad = createInitialSquad()
    expect(computeReadiness(squad)).toBe(100)
  })

  it('drops when a consumable slot is empty', () => {
    const squad = createInitialSquad()
    squad.units[0].slots.find((s) => s.slotId === 'medkit')!.itemId = null
    expect(computeReadiness(squad)).toBeLessThan(100)
  })
})

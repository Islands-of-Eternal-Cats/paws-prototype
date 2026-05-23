import { describe, it, expect } from 'vitest'
import { applyBreakdown } from './events.js'
import { createInitialSquad } from './content.js'
import { computeReadiness } from './readiness.js'
import { createRng } from './rng.js'

describe('applyBreakdown', () => {
  it('clears a consumable slot and lowers readiness', () => {
    const squad = createInitialSquad()
    const before = computeReadiness(squad)
    const evt = applyBreakdown(squad, createRng(42), 0, 0)
    expect(evt.type).toBe('breakdown')
    expect(computeReadiness(squad)).toBeLessThan(before)
  })
})

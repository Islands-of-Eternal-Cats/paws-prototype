import { describe, it, expect } from 'vitest'
import { applyBreakdown } from './events.js'
import { createInitialSquads } from './content.js'
import { computeReadiness } from './readiness.js'
import { createRng } from './rng.js'

describe('applyBreakdown', () => {
  it('clears a consumable slot and lowers readiness', () => {
    const [squad] = createInitialSquads()
    const before = computeReadiness(squad)
    const evt = applyBreakdown(squad, createRng(42), 0, 0)
    expect(evt.type).toBe('breakdown')
    expect(evt.squadId).toBe('KOBRA-1')
    expect(computeReadiness(squad)).toBeLessThan(before)
  })
})

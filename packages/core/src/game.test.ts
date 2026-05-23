import { describe, it, expect } from 'vitest'
import { createGame } from './game.js'
import { BASE_PAUSE_MS, TICK_STEP_MS } from './config.js'
import { createInitialSquad } from './content.js'
import { resupplySquad } from './resupply.js'
import { createInitialStorage } from './content.js'
import { computeReadiness } from './readiness.js'

describe('createGame', () => {
  it('transitions AtBase to Deploying after BASE_PAUSE_MS', () => {
    const game = createGame({ seed: 1 })
    let state = game.getState()
    expect(state.phase).toBe('AtBase')
    const ticks = Math.ceil(BASE_PAUSE_MS / TICK_STEP_MS) + 1
    for (let i = 0; i < ticks; i++) game.tick(TICK_STEP_MS)
    state = game.getState()
    expect(state.phase).toBe('Deploying')
  })

  it('same seed produces identical event messages for N ticks', () => {
    const run = (seed: number) => {
      const g = createGame({ seed })
      for (let i = 0; i < 500; i++) g.tick(100)
      return g.getState().eventLog.map((e) => e.message).join('|')
    }
    expect(run(99)).toBe(run(99))
    expect(run(99)).not.toBe(run(100))
  })

  it('resupply at base restores readiness after encounter damage', () => {
    const squad = createInitialSquad()
    squad.units[0].slots.find((s) => s.slotId === 'medkit')!.itemId = null
    expect(computeReadiness(squad)).toBeLessThan(100)
    const storage = createInitialStorage()
    resupplySquad(squad, storage)
    expect(computeReadiness(squad)).toBe(100)
  })
})

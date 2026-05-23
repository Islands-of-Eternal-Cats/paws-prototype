import { describe, it, expect } from 'vitest'
import { resupplySquad } from './resupply.js'
import { createInitialSquad, createInitialStorage } from './content.js'

describe('resupplySquad', () => {
  it('refills medkit from base storage', () => {
    const squad = createInitialSquad()
    const medic = squad.units.find((u) => u.id === 'medic')!
    medic.slots.find((s) => s.slotId === 'medkit')!.itemId = null
    const storage = createInitialStorage()
    resupplySquad(squad, storage)
    expect(medic.slots.find((s) => s.slotId === 'medkit')!.itemId).toBe('medkit')
    const medStack = storage.find((s) => s.itemId === 'medkit')
    expect(medStack!.qty).toBeLessThan(10)
  })
})

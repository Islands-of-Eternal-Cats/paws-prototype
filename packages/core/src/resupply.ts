import type { ItemStack, SquadState } from './types.js'
import { getTemplateSlotsForUnit } from './content.js'

function takeFromStorage(storage: ItemStack[], itemId: string): boolean {
  const stack = storage.find((s) => s.itemId === itemId)
  if (!stack || stack.qty <= 0) return false
  stack.qty -= 1
  return true
}

export function resupplySquad(squad: SquadState, baseStorage: ItemStack[]): void {
  for (const unit of squad.units) {
    const template = getTemplateSlotsForUnit(unit.id)
    for (const t of template) {
      const slot = unit.slots.find((s) => s.slotId === t.slotId)
      if (!slot) continue
      if (slot.itemId !== t.itemId) {
        if (takeFromStorage(baseStorage, t.itemId)) {
          slot.itemId = t.itemId
        }
      }
    }
  }
}

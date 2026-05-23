import type { GameEvent, SquadState } from './types.js'
import { getTemplateSlotsForUnit } from './content.js'
import type { Rng } from './rng.js'

const CONSUMABLE_SLOTS = new Set(['medkit', 'toolkit', 'scanner'])

function addCargo(squad: SquadState, itemId: string, qty: number): void {
  const stack = squad.cargo.find((s) => s.itemId === itemId)
  if (stack) stack.qty += qty
  else squad.cargo.push({ itemId, qty })
}

export function applyEncounter(
  squad: SquadState,
  rng: Rng,
  tick: number,
  simTimeMs: number,
): GameEvent {
  const unit = squad.units[rng.int(0, squad.units.length - 1)]
  const clearable = unit.slots.filter(
    (s) => s.itemId && (s.slotId === 'armor' || CONSUMABLE_SLOTS.has(s.slotId)),
  )
  const target =
    clearable.length > 0
      ? clearable[rng.int(0, clearable.length - 1)]
      : unit.slots[rng.int(0, unit.slots.length - 1)]
  const lost = target.itemId
  target.itemId = null
  return {
    tick,
    simTimeMs,
    type: 'encounter',
    message: `${unit.name} took fire — lost ${lost ?? 'gear'}`,
  }
}

export function applyLoot(
  squad: SquadState,
  rng: Rng,
  tick: number,
  simTimeMs: number,
): GameEvent {
  const qty = rng.int(1, 3)
  addCargo(squad, 'scrap', qty)
  return {
    tick,
    simTimeMs,
    type: 'loot',
    message: `Salvaged ${qty} scrap`,
  }
}

export function applyBreakdown(
  squad: SquadState,
  rng: Rng,
  tick: number,
  simTimeMs: number,
): GameEvent {
  const unitsWithConsumables = squad.units.filter((u) =>
    u.slots.some((s) => s.itemId && CONSUMABLE_SLOTS.has(s.slotId)),
  )
  const pool =
    unitsWithConsumables.length > 0 ? unitsWithConsumables : squad.units
  const unit = pool[rng.int(0, pool.length - 1)]
  const consumables = unit.slots.filter(
    (s) => s.itemId && CONSUMABLE_SLOTS.has(s.slotId),
  )
  const slot =
    consumables.length > 0
      ? consumables[rng.int(0, consumables.length - 1)]
      : unit.slots.find((s) => s.itemId)!
  const lost = slot.itemId
  slot.itemId = null
  return {
    tick,
    simTimeMs,
    type: 'breakdown',
    message: `${unit.name} gear failure — ${lost} unserviceable`,
  }
}

export function rollMissionEvent(
  squad: SquadState,
  rng: Rng,
  tick: number,
  simTimeMs: number,
): GameEvent {
  const roll = rng.int(0, 2)
  if (roll === 0) return applyEncounter(squad, rng, tick, simTimeMs)
  if (roll === 1) return applyLoot(squad, rng, tick, simTimeMs)
  return applyBreakdown(squad, rng, tick, simTimeMs)
}

export function itemsLostDuringMission(squad: SquadState, before: SquadState): string[] {
  const lost: string[] = []
  for (const unit of squad.units) {
    const template = getTemplateSlotsForUnit(unit.id)
    for (const t of template) {
      const now = unit.slots.find((s) => s.slotId === t.slotId)?.itemId
      const prev = before.units
        .find((u) => u.id === unit.id)
        ?.slots.find((s) => s.slotId === t.slotId)?.itemId
      if (prev && !now) lost.push(`${unit.name}: ${prev}`)
    }
  }
  return lost
}

import type { ItemStack, MapNode, SquadState, UnitState } from './types.js'
import { MAP_HEIGHT, MAP_WIDTH } from './config.js'

export const MAP_NODES: MapNode[] = [
  { id: 'hq', label: 'NINE LIVES HQ', x: 120, y: 380 },
  { id: 'mines', label: 'OLD MINES', x: 280, y: 120 },
  { id: 'bay7', label: 'BAY-7 STATION', x: 520, y: 200 },
  { id: 'reactor', label: 'REACTOR SITE', x: 680, y: 320 },
  { id: 'depot', label: 'FIELD DEPOT', x: 400, y: 420 },
]

export const MAP_EDGES: [string, string][] = [
  ['hq', 'mines'],
  ['hq', 'depot'],
  ['mines', 'bay7'],
  ['bay7', 'reactor'],
  ['depot', 'bay7'],
]

export interface TemplateSlot {
  slotId: string
  itemId: string
}

const UNIT_DEFS: Array<{
  id: string
  name: string
  role: string
  template: TemplateSlot[]
}> = [
  {
    id: 'medic',
    name: 'DOC WHISKERS',
    role: 'Medic',
    template: [
      { slotId: 'weapon', itemId: 'smg' },
      { slotId: 'armor', itemId: 'light_armor' },
      { slotId: 'medkit', itemId: 'medkit' },
    ],
  },
  {
    id: 'engineer',
    name: 'WRENCH',
    role: 'Engineer',
    template: [
      { slotId: 'weapon', itemId: 'shotgun' },
      { slotId: 'armor', itemId: 'light_armor' },
      { slotId: 'toolkit', itemId: 'toolkit' },
    ],
  },
  {
    id: 'scout',
    name: 'SHADOW',
    role: 'Scout',
    template: [
      { slotId: 'weapon', itemId: 'smg' },
      { slotId: 'armor', itemId: 'cloak' },
      { slotId: 'scanner', itemId: 'scanner' },
    ],
  },
]

export function getTemplateSlotsForUnit(unitId: string): TemplateSlot[] {
  const def = UNIT_DEFS.find((u) => u.id === unitId)
  if (!def) return []
  return def.template
}

function buildUnit(def: (typeof UNIT_DEFS)[0]): UnitState {
  return {
    id: def.id,
    name: def.name,
    role: def.role,
    slots: def.template.map((t) => ({
      slotId: t.slotId,
      itemId: t.itemId,
    })),
  }
}

export function createInitialSquad(): SquadState {
  return {
    name: 'KOBRA-1',
    readiness: 100,
    units: UNIT_DEFS.map(buildUnit),
    cargo: [],
  }
}

export function createInitialStorage(): ItemStack[] {
  return [
    { itemId: 'ammo', qty: 200 },
    { itemId: 'medkit', qty: 10 },
    { itemId: 'toolkit', qty: 5 },
    { itemId: 'fuel', qty: 80 },
    { itemId: 'materials', qty: 120 },
    { itemId: 'scrap', qty: 0 },
  ]
}

export function getHqPosition(): { x: number; y: number } {
  const hq = MAP_NODES.find((n) => n.id === 'hq')!
  return { x: hq.x, y: hq.y }
}

export function rollObjective(
  rng: { int(min: number, max: number): number },
): { x: number; y: number } {
  const pois = MAP_NODES.filter((n) => n.id !== 'hq')
  const node = pois[rng.int(0, pois.length - 1)]
  return { x: node.x, y: node.y }
}

export function objectiveLabel(objective: { x: number; y: number }): string {
  let best = MAP_NODES[0]
  let bestDist = Infinity
  for (const node of MAP_NODES) {
    const dx = node.x - objective.x
    const dy = node.y - objective.y
    const d = dx * dx + dy * dy
    if (d < bestDist) {
      bestDist = d
      best = node
    }
  }
  return best.label
}

export function clampObjective(pos: { x: number; y: number }): { x: number; y: number } {
  return {
    x: Math.max(40, Math.min(MAP_WIDTH - 40, pos.x)),
    y: Math.max(40, Math.min(MAP_HEIGHT - 40, pos.y)),
  }
}

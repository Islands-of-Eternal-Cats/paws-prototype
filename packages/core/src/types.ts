export type GamePhase =
  | 'AtBase'
  | 'Deploying'
  | 'InMission'
  | 'Returning'
  | 'MissionReport'

export type PlayerCommand = never

export interface ItemStack {
  itemId: string
  qty: number
}

export interface UnitSlot {
  slotId: string
  itemId: string | null
}

export interface UnitState {
  id: string
  name: string
  role: string
  slots: UnitSlot[]
}

export interface SquadState {
  name: string
  readiness: number
  units: UnitState[]
  cargo: ItemStack[]
}

export interface MapNode {
  id: string
  label: string
  x: number
  y: number
}

export interface GameEvent {
  tick: number
  simTimeMs: number
  type: 'encounter' | 'loot' | 'breakdown' | 'phase' | 'resupply'
  message: string
}

export interface MissionReport {
  outcome: 'success' | 'partial' | 'failed'
  durationMs: number
  readinessBefore: number
  readinessAfter: number
  events: GameEvent[]
  lootGained: ItemStack[]
  itemsLost: string[]
}

export interface GameState {
  tick: number
  seed: number
  simTimeMs: number
  missionIndex: number
  phase: GamePhase
  phaseTimeLeftMs: number
  missionProgress: number
  objective: { x: number; y: number }
  squad: SquadState
  baseStorage: ItemStack[]
  eventLog: GameEvent[]
  lastReport: MissionReport | null
  mapNodes: MapNode[]
  missionElapsedMs: number
  nextEventInMs: number
  missionEvents: GameEvent[]
  readinessAtMissionStart: number
}

export const TICK_STEP_MS = 100
export const DEPLOYING_MS = 2000
export const RETURNING_MS = 5000
export const MISSION_REPORT_MS = 5000
export const BASE_PAUSE_MS = 15000
export const EVENT_INTERVAL_MS = 8000
export const EVENT_LOG_MAX = 20
export const MAP_WIDTH = 800
export const MAP_HEIGHT = 500
export const MISSION_POOL_SIZE = 3
export const READINESS_EXTEND_RESUPPLY = 5000 // extend resupply by 5s if readiness < 80%

export interface MissionTypeConfig {
  durationMs: number
  eventRateModifier: number // 1 = normal, 0.5 = half rate, 2 = double
  penaltyPercent: number
  lootMultiplier: number
  eventWeights: {
    encounter: number
    detection: number
    loot: number
    breakdown: number
  }
}

export const MISSION_TYPE_CONFIGS: Record<MissionType, MissionTypeConfig> = {
  PATROL: {
    durationMs: 30000,
    eventRateModifier: 0.8,
    penaltyPercent: 5,
    lootMultiplier: 0.5,
    eventWeights: { encounter: 0, detection: 0, loot: 40, breakdown: 60 },
  },
  RECON: {
    durationMs: 45000,
    eventRateModifier: 1,
    penaltyPercent: 10,
    lootMultiplier: 1,
    eventWeights: { encounter: 30, detection: 30, loot: 30, breakdown: 10 },
  },
  ASSAULT: {
    durationMs: 60000,
    eventRateModifier: 1.5,
    penaltyPercent: 15,
    lootMultiplier: 2,
    eventWeights: { encounter: 50, detection: 0, loot: 20, breakdown: 30 },
  },
}

import {
  BASE_PAUSE_MS,
  DEPLOYING_MS,
  EVENT_INTERVAL_MS,
  EVENT_LOG_MAX,
  MISSION_DURATION_MS,
  MISSION_REPORT_MS,
  RETURNING_MS,
  TICK_STEP_MS,
} from './config.js'
import {
  MAP_NODES,
  createInitialSquad,
  createInitialStorage,
  getHqPosition,
  rollObjective,
} from './content.js'
import { itemsLostDuringMission, rollMissionEvent } from './events.js'
import { createRng, type Rng } from './rng.js'
import { computeReadiness } from './readiness.js'
import { resupplySquad } from './resupply.js'
import type {
  GameEvent,
  GamePhase,
  GameState,
  ItemStack,
  MissionReport,
  SquadState,
} from './types.js'

const PHASE_MESSAGES: Record<GamePhase, string> = {
  AtBase: 'KOBRA-1 at HQ — resupply',
  Deploying: 'KOBRA-1 deploying',
  InMission: 'KOBRA-1 on mission',
  Returning: 'KOBRA-1 returning to HQ',
  MissionReport: 'Mission debrief',
}

function pushEvent(state: GameState, event: GameEvent): void {
  state.eventLog = [event, ...state.eventLog].slice(0, EVENT_LOG_MAX)
}

function cloneSquad(squad: SquadState): SquadState {
  return JSON.parse(JSON.stringify(squad)) as SquadState
}

function lootGainedSince(current: SquadState, before: SquadState): ItemStack[] {
  const gained: ItemStack[] = []
  for (const stack of current.cargo) {
    const prev = before.cargo.find((s) => s.itemId === stack.itemId)?.qty ?? 0
    const delta = stack.qty - prev
    if (delta > 0) gained.push({ itemId: stack.itemId, qty: delta })
  }
  return gained
}

function createInitialState(seed: number): GameState {
  const squad = createInitialSquad()
  squad.readiness = computeReadiness(squad)
  const state: GameState = {
    tick: 0,
    seed,
    simTimeMs: 0,
    missionIndex: 0,
    phase: 'AtBase',
    phaseTimeLeftMs: BASE_PAUSE_MS,
    missionProgress: 0,
    objective: getHqPosition(),
    squad,
    baseStorage: createInitialStorage(),
    eventLog: [],
    lastReport: null,
    mapNodes: MAP_NODES,
    missionElapsedMs: 0,
    nextEventInMs: EVENT_INTERVAL_MS,
    missionEvents: [],
    readinessAtMissionStart: squad.readiness,
  }
  pushEvent(state, {
    tick: 0,
    simTimeMs: 0,
    type: 'phase',
    message: 'KOBRA-1 standing by',
  })
  return state
}

export interface Game {
  tick(dtMs: number): void
  getState(): GameState
}

export function createGame(options?: { seed?: number }): Game {
  const seed = options?.seed ?? 42
  const rng: Rng = createRng(seed)
  const state = createInitialState(seed)
  let accumulated = 0
  let squadSnapshot: SquadState | null = null
  let missionStartSimTime = 0

  function buildReport(): void {
    const readinessAfter = computeReadiness(state.squad)
    const outcome: MissionReport['outcome'] =
      readinessAfter > 20 ? 'success' : 'partial'
    state.lastReport = {
      outcome,
      durationMs: state.simTimeMs - missionStartSimTime,
      readinessBefore: state.readinessAtMissionStart,
      readinessAfter,
      events: [...state.missionEvents],
      lootGained: squadSnapshot
        ? lootGainedSince(state.squad, squadSnapshot)
        : [],
      itemsLost: squadSnapshot
        ? itemsLostDuringMission(state.squad, squadSnapshot)
        : [],
    }
  }

  function enterPhase(phase: GamePhase, durationMs: number): void {
    state.phase = phase
    state.phaseTimeLeftMs = durationMs
    pushEvent(state, {
      tick: state.tick,
      simTimeMs: state.simTimeMs,
      type: 'phase',
      message: PHASE_MESSAGES[phase],
    })

    if (phase === 'AtBase') {
      resupplySquad(state.squad, state.baseStorage)
      pushEvent(state, {
        tick: state.tick,
        simTimeMs: state.simTimeMs,
        type: 'resupply',
        message: 'Resupplying…',
      })
      state.missionProgress = 0
      state.objective = getHqPosition()
    }

    if (phase === 'Deploying') {
      state.missionProgress = 0
    }

    if (phase === 'InMission') {
      state.missionIndex += 1
      state.objective = rollObjective(rng)
      state.missionProgress = 0
      state.missionElapsedMs = 0
      state.nextEventInMs = EVENT_INTERVAL_MS
      state.missionEvents = []
      state.readinessAtMissionStart = computeReadiness(state.squad)
      squadSnapshot = cloneSquad(state.squad)
      missionStartSimTime = state.simTimeMs
    }

    if (phase === 'Returning') {
      state.missionProgress = 1
    }

    if (phase === 'MissionReport') {
      buildReport()
    }

    state.squad.readiness = computeReadiness(state.squad)
  }

  function advancePhase(): void {
    switch (state.phase) {
      case 'AtBase':
        enterPhase('Deploying', DEPLOYING_MS)
        break
      case 'Deploying':
        enterPhase('InMission', MISSION_DURATION_MS)
        break
      case 'InMission':
        enterPhase('Returning', RETURNING_MS)
        break
      case 'Returning':
        enterPhase('MissionReport', MISSION_REPORT_MS)
        break
      case 'MissionReport':
        enterPhase('AtBase', BASE_PAUSE_MS)
        break
    }
  }

  function step(): void {
    state.tick += 1
    state.simTimeMs += TICK_STEP_MS
    state.phaseTimeLeftMs -= TICK_STEP_MS

    if (state.phase === 'InMission') {
      state.missionElapsedMs += TICK_STEP_MS
      state.missionProgress = Math.min(
        1,
        state.missionElapsedMs / MISSION_DURATION_MS,
      )
      state.nextEventInMs -= TICK_STEP_MS
      if (state.nextEventInMs <= 0) {
        const evt = rollMissionEvent(
          state.squad,
          rng,
          state.tick,
          state.simTimeMs,
        )
        state.missionEvents.push(evt)
        pushEvent(state, evt)
        state.nextEventInMs = EVENT_INTERVAL_MS
      }
    }

    if (state.phase === 'Returning') {
      state.missionProgress = Math.max(
        0,
        state.phaseTimeLeftMs / RETURNING_MS,
      )
    }

    state.squad.readiness = computeReadiness(state.squad)

    if (state.phaseTimeLeftMs <= 0) {
      advancePhase()
    }
  }

  return {
    tick(dtMs: number): void {
      accumulated += dtMs
      while (accumulated >= TICK_STEP_MS) {
        accumulated -= TICK_STEP_MS
        step()
      }
    },
    getState(): GameState {
      return structuredClone(state)
    },
  }
}

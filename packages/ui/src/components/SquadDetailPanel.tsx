import type { GameState } from '@paws/core'
import { phaseToLocation, phaseToStatus } from '../utils/format'

interface Props {
  state: GameState
}

export function SquadDetailPanel({ state }: Props) {
  return (
    <section className="panel-section">
      <h2 className="squad-detail__name">{state.squad.name}</h2>
      <div className="squad-detail__readiness-big">{state.squad.readiness}%</div>
      <div className="detail-tabs">
        <button type="button" className="active" disabled>
          OVERVIEW
        </button>
        <button type="button" disabled>
          LOADOUT
        </button>
        <button type="button" disabled>
          VEHICLE
        </button>
      </div>
      <div className="stat-row">
        <span>Status</span>
        <span>{phaseToStatus(state.phase)}</span>
      </div>
      <div className="stat-row">
        <span>Location</span>
        <span>{phaseToLocation(state.phase)}</span>
      </div>
      <div className="stat-row">
        <span>Combat Readiness</span>
        <span>{state.squad.readiness}%</span>
      </div>
      <button type="button" className="btn-primary" disabled>
        AUTO
      </button>
      <label className="auto-row">
        <input type="checkbox" checked disabled readOnly />
        Auto Resupply
      </label>
      <div className="template-row">Template: ASSAULT</div>
    </section>
  )
}

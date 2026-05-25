import type { GameState } from '@paws/core'
import { phaseToLocation, phaseToStatus } from '../utils/format'

interface Props {
  state: GameState
}

export function SquadDetailPanel({ state }: Props) {
  const active = state.squads.find(
    (s) => s.phase === 'InMission' || s.phase === 'Returning' || s.phase === 'Deploying',
  ) || state.squads[0]

  return (
    <section className="panel-section">
      <h2 className="squad-detail__name">{active.name}</h2>
      <div className="squad-detail__readiness-big">{active.readiness}%</div>
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
        <span>{phaseToStatus(active.phase)}</span>
      </div>
      <div className="stat-row">
        <span>Location</span>
        <span>{phaseToLocation(active.phase)}</span>
      </div>
      <div className="stat-row">
        <span>Combat Readiness</span>
        <span>{active.readiness}%</span>
      </div>
      <div className="stat-row">
        <span>Doctrine</span>
        <span>{active.doctrine}</span>
      </div>
      <button type="button" className="btn-primary" disabled>
        AUTO
      </button>
      <label className="auto-row">
        <input type="checkbox" checked disabled readOnly />
        Auto Resupply
      </label>
      <div className="template-row">Template: {active.doctrine}</div>
    </section>
  )
}

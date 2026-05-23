import type { GameState } from '@paws/core'
import { phaseToStatus, readinessBarClass } from '../utils/format'

interface Props {
  state: GameState
}

export function SquadList({ state }: Props) {
  const status = phaseToStatus(state.phase)
  const badgeClass =
    state.phase === 'AtBase'
      ? 'badge badge--ready'
      : state.phase === 'InMission'
        ? 'badge badge--mission'
        : 'badge'

  return (
    <section className="panel-section">
      <h2 className="panel-title">Squads</h2>
      <div className="squad-list-item">
        <div>
          <strong>{state.squad.name}</strong>
          <div>
            <span className={badgeClass}>{status}</span>
          </div>
        </div>
        <div className="squad-list-item__bar">
          <div className="progress-bar">
            <div
              className={readinessBarClass(state.squad.readiness)}
              style={{ width: `${state.squad.readiness}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

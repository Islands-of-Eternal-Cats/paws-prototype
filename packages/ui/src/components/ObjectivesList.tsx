import { objectiveLabel, type GameState } from '@paws/core'

interface Props {
  state: GameState
}

export function ObjectivesList({ state }: Props) {
  const location =
    state.phase === 'InMission' || state.phase === 'Returning'
      ? objectiveLabel(state.objective)
      : 'NINE LIVES HQ'

  return (
    <section className="panel-section">
      <h2 className="panel-title">Objectives</h2>
      <div className="card">
        <div className="card__title">AUTO PATROL</div>
        <div className="card__meta">
          <span className="badge badge--medium">MEDIUM</span>
          <span> · {location}</span>
        </div>
      </div>
    </section>
  )
}

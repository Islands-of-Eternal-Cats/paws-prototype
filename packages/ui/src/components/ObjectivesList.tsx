import { objectiveLabel, type GameState } from '@paws/core'

interface Props {
  state: GameState
}

const TYPE_BADGE: Record<string, string> = {
  ASSAULT: 'badge--danger',
  RECON: 'badge--medium',
  PATROL: 'badge--ready',
}

export function ObjectivesList({ state }: Props) {
  const activeSquads = state.squads.filter(
    (s) => s.phase === 'InMission' || s.phase === 'Returning' || s.phase === 'Deploying',
  )

  return (
    <section className="panel-section">
      <h2 className="panel-title">Objectives</h2>
      {activeSquads.map((squad) => {
        const target = state.missionPool.find((t) => t.id === squad.missionTargetId)
        const location = target ? target.label : objectiveLabel({ x: 0, y: 0 })
        const badgeClass = `badge ${TYPE_BADGE[squad.doctrine] || 'badge--medium'}`

        return (
          <div key={squad.id} className="card">
            <div className="card__title">
              {squad.id} — {squad.doctrine}
            </div>
            <div className="card__meta">
              <span className={badgeClass}>{squad.doctrine}</span>
              <span> · {location}</span>
            </div>
          </div>
        )
      })}
      {activeSquads.length === 0 && (
        <div className="card">
          <div className="card__title">ALL AT BASE</div>
          <div className="card__meta">
            <span>Ready for next deployment</span>
          </div>
        </div>
      )}
    </section>
  )
}

import type { GameState } from '@paws/core'
import { UnitCard } from './UnitCard'

interface Props {
  state: GameState
}

export function SquadMemberRow({ state }: Props) {
  // Show all squads' members, grouped
  const activeSquads = state.squads.filter(
    (s) => s.phase === 'InMission' || s.phase === 'Returning' || s.phase === 'Deploying',
  )
  // If none active, show all at base
  const squadsToShow = activeSquads.length > 0 ? activeSquads : state.squads

  return (
    <div className="app-squad-row">
      {squadsToShow.map((squad) => (
        <div key={squad.id} style={{ flex: 1 }}>
          <h3 style={{ color: 'var(--muted)', fontSize: 12, margin: '4px 0' }}>
            {squad.name} — {squad.doctrine}
          </h3>
          <div className="squad-member-row">
            {squad.units.map((unit) => (
              <UnitCard key={unit.id} unit={unit} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

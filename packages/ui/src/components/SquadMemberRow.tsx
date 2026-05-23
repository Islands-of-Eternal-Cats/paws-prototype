import type { GameState } from '@paws/core'
import { UnitCard } from './UnitCard'

interface Props {
  state: GameState
}

export function SquadMemberRow({ state }: Props) {
  return (
    <div className="app-squad-row">
      <h2 className="panel-title">Squad Members</h2>
      <div className="squad-member-row">
        {state.squad.units.map((unit) => (
          <UnitCard key={unit.id} unit={unit} />
        ))}
      </div>
    </div>
  )
}

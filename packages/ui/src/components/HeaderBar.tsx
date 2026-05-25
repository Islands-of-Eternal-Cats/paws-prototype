import type { GameState } from '@paws/core'
import { formatDay, formatSimTime, stackQty } from '../utils/format'

interface Props {
  state: GameState
}

export function HeaderBar({ state }: Props) {
  const fuel = stackQty(state.baseStorage, 'fuel')
  const materials = stackQty(state.baseStorage, 'materials')
  const ammo = stackQty(state.baseStorage, 'ammo')

  return (
    <header className="app-header">
      <div className="header-brand">
        <h1 className="header-brand__title">NINE LIVES CORP.</h1>
        <p className="header-brand__sub">OPERATIONAL COMMAND SYSTEM</p>
      </div>
      <div className="resource-strip">
        <div className="resource-item">
          <div className="resource-item__label">Fuel</div>
          <div className="resource-item__value">
            {fuel} / 100
          </div>
        </div>
        <div className="resource-item">
          <div className="resource-item__label">Supplies</div>
          <div className="resource-item__value">{materials}</div>
        </div>
        <div className="resource-item">
          <div className="resource-item__label">Ammo</div>
          <div className="resource-item__value">{ammo}</div>
        </div>
        <div className="resource-item">
          <div className="resource-item__label">Squads</div>
          <div className="resource-item__value">
            {state.squads.filter((s) => s.phase !== 'AtBase').length}/{state.squads.length}
          </div>
        </div>
      </div>
      <div className="header-clock">
        <div className="header-clock__day">DAY {formatDay(state.simTimeMs)}</div>
        <div>{formatSimTime(state.simTimeMs)}</div>
        <div className="transport-controls">
          <button type="button" disabled>
            ⏸
          </button>
          <button type="button" disabled>
            ▶
          </button>
          <button type="button" disabled>
            ⏩
          </button>
        </div>
      </div>
    </header>
  )
}

import { computeUnitReadiness, type UnitState } from '@paws/core'
import { readinessBarClass } from '../utils/format'

const ROLE_EMOJI: Record<string, string> = {
  Medic: '🩺',
  Engineer: '🔧',
  Scout: '👁',
  Geologist: '⛏',
}

const SLOT_LABEL: Record<string, string> = {
  weapon: 'WPN',
  armor: 'ARM',
  medkit: 'MED',
  toolkit: 'TKT',
  scanner: 'SCN',
  drill: 'DRILL',
}

interface Props {
  unit: UnitState
}

export function UnitCard({ unit }: Props) {
  const readiness = computeUnitReadiness(unit.id, unit.slots)

  return (
    <article className="unit-card">
      <div className="unit-card__portrait">{ROLE_EMOJI[unit.role] ?? '🐱'}</div>
      <h3 className="unit-card__name">{unit.name}</h3>
      <p className="unit-card__role">{unit.role}</p>
      <div className="unit-card__slots">
        {unit.slots.map((s) => (
          <span
            key={s.slotId}
            className={`slot-icon ${s.itemId ? 'slot-icon--filled' : ''}`}
          >
            {SLOT_LABEL[s.slotId] ?? s.slotId}
          </span>
        ))}
      </div>
      <div className="unit-card__readiness-label">
        <span>Readiness</span>
        <span>{readiness}%</span>
      </div>
      <div className="progress-bar">
        <div
          className={readinessBarClass(readiness)}
          style={{ width: `${readiness}%` }}
        />
      </div>
    </article>
  )
}

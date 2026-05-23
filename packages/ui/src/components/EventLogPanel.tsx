import type { GameState } from '@paws/core'
import { formatSimTime } from '../utils/format'

interface Props {
  state: GameState
}

export function EventLogPanel({ state }: Props) {
  return (
    <section className="event-log">
      <h2 className="panel-title">Event Log</h2>
      {state.eventLog.map((evt, i) => (
        <div key={`${evt.tick}-${i}`} className="event-log__item">
          <span className="event-log__time">{formatSimTime(evt.simTimeMs)}</span>
          {evt.message}
        </div>
      ))}
    </section>
  )
}

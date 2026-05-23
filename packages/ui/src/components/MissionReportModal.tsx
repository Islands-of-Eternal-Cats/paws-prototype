import type { GameState } from '@paws/core'

interface Props {
  state: GameState
}

export function MissionReportModal({ state }: Props) {
  if (state.phase !== 'MissionReport' || !state.lastReport) return null

  const report = state.lastReport
  const headline =
    report.outcome === 'success'
      ? 'MISSION SUCCESS'
      : report.outcome === 'partial'
        ? 'MISSION PARTIAL'
        : 'MISSION FAILED'

  return (
    <div className="report-modal-backdrop">
      <div className="report-modal">
        <h2>{headline}</h2>
        <p>
          Readiness {report.readinessBefore}% → {report.readinessAfter}%
        </p>
        <p>Duration: {Math.round(report.durationMs / 1000)}s</p>
        {report.events.length > 0 && (
          <>
            <strong>Events</strong>
            <ul>
              {report.events.map((e, i) => (
                <li key={i}>{e.message}</li>
              ))}
            </ul>
          </>
        )}
        {report.lootGained.length > 0 && (
          <p>Loot: {report.lootGained.map((l) => `${l.qty} ${l.itemId}`).join(', ')}</p>
        )}
        {report.itemsLost.length > 0 && (
          <p>Lost: {report.itemsLost.join('; ')}</p>
        )}
      </div>
    </div>
  )
}

import type { GamePhase } from '@paws/core'

interface Props {
  phase: GamePhase
  phaseTimeLeftMs: number
}

export function PhaseBanner({ phase, phaseTimeLeftMs }: Props) {
  const sec = Math.ceil(phaseTimeLeftMs / 1000)
  let text: string | null = null

  switch (phase) {
    case 'AtBase':
      text = `RESUPPLYING… ${sec}s`
      break
    case 'InMission':
      text = 'ON MISSION'
      break
    case 'Returning':
      text = 'RETURNING TO HQ'
      break
    case 'Deploying':
      text = 'DEPLOYING'
      break
    default:
      text = null
  }

  if (!text) return null
  return <div className="phase-banner">{text}</div>
}

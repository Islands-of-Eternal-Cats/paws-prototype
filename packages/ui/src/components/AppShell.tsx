import type { GameState } from '@paws/core'
import { HeaderBar } from './HeaderBar'
import { LeftSidebar } from './LeftSidebar'
import { MissionMap } from './MissionMap'
import { RightSidebar } from './RightSidebar'
import { SquadMemberRow } from './SquadMemberRow'

interface Props {
  state: GameState
}

export function AppShell({ state }: Props) {
  return (
    <div className="app-shell">
      <HeaderBar state={state} />
      <LeftSidebar state={state} />
      <MissionMap state={state} />
      <RightSidebar state={state} />
      <SquadMemberRow state={state} />
    </div>
  )
}

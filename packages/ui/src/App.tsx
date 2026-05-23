import { useGameLoop } from './hooks/useGameLoop'
import { AppShell } from './components/AppShell'

export default function App() {
  const state = useGameLoop()
  return <AppShell state={state} />
}

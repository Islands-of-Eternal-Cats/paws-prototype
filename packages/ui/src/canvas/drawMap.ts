import { MAP_EDGES, getHqPosition, type GameState } from '@paws/core'

export function drawMap(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  width: number,
  height: number,
): void {
  const dpr = window.devicePixelRatio || 1
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  const w = width / dpr
  const h = height / dpr

  ctx.fillStyle = '#0b0f12'
  ctx.fillRect(0, 0, w, h)

  const scaleX = w / 800
  const scaleY = h / 500
  const sx = (x: number) => x * scaleX
  const sy = (y: number) => y * scaleY

  const nodeById = Object.fromEntries(state.mapNodes.map((n) => [n.id, n]))

  ctx.strokeStyle = '#1e2a36'
  ctx.lineWidth = 1
  ctx.setLineDash([6, 4])
  for (const [a, b] of MAP_EDGES) {
    const na = nodeById[a]
    const nb = nodeById[b]
    if (!na || !nb) continue
    ctx.beginPath()
    ctx.moveTo(sx(na.x), sy(na.y))
    ctx.lineTo(sx(nb.x), sy(nb.y))
    ctx.stroke()
  }
  ctx.setLineDash([])

  for (const node of state.mapNodes) {
    const isObjective =
      state.phase === 'InMission' || state.phase === 'Returning'
    const isHq = node.id === 'hq'
    const isTarget =
      isObjective &&
      Math.hypot(node.x - state.objective.x, node.y - state.objective.y) < 40

    ctx.beginPath()
    ctx.arc(sx(node.x), sy(node.y), isTarget ? 10 : 7, 0, Math.PI * 2)
    ctx.fillStyle = isHq ? '#4ecdc4' : isTarget ? '#f0a500' : '#2a3848'
    ctx.fill()
    ctx.strokeStyle = isTarget ? '#f0a500' : '#4ecdc4'
    ctx.lineWidth = isHq || isTarget ? 2 : 1
    ctx.stroke()

    ctx.fillStyle = '#6b7d8a'
    ctx.font = '11px Rajdhani, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(node.label, sx(node.x), sy(node.y) + 22)
  }

  const hq = getHqPosition()
  const t = state.objective
  const progress =
    state.phase === 'Returning'
      ? state.missionProgress
      : state.phase === 'InMission'
        ? state.missionProgress
        : 0
  const px = hq.x + (t.x - hq.x) * progress
  const py = hq.y + (t.y - hq.y) * progress

  if (
    state.phase === 'InMission' ||
    state.phase === 'Returning' ||
    state.phase === 'Deploying'
  ) {
    ctx.beginPath()
    ctx.moveTo(sx(px), sy(py) - 10)
    ctx.lineTo(sx(px) - 8, sy(py) + 8)
    ctx.lineTo(sx(px) + 8, sy(py) + 8)
    ctx.closePath()
    ctx.fillStyle = '#4ecdc4'
    ctx.fill()
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 1
    ctx.stroke()
  }
}

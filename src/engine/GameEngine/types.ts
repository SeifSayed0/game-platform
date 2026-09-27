export type GamePhase =
  | 'idle'
  | 'playing'
  | 'paused'
  | 'finished'

export type GamePlayer = {
  id: string
  name?: string
}

export type GameSessionState<TState = unknown> = {
  sessionId: string
  gameId: string
  gameVersion: string
  phase: GamePhase
  players: GamePlayer[]
  state: TState
  startedAt: number | null
  finishedAt: number | null
}

import type {
  GamePhase,
  GamePlayer,
  GameSessionState,
} from '../GameEngine/types'

export class GameSession<TState = unknown> {
  private session: GameSessionState<TState>

  constructor(params: {
    sessionId: string
    gameId: string
    gameVersion: string
    players: GamePlayer[]
    initialState: TState
  }) {
    this.session = {
      sessionId: params.sessionId,
      gameId: params.gameId,
      gameVersion: params.gameVersion,
      phase: 'idle',
      players: params.players,
      state: params.initialState,
      startedAt: null,
      finishedAt: null,
    }
  }

  start(): void {
    if (this.session.phase !== 'idle') {
      return
    }

    this.session.phase = 'playing'
    this.session.startedAt = Date.now()
  }

  pause(): void {
    if (this.session.phase !== 'playing') {
      return
    }

    this.session.phase = 'paused'
  }

  resume(): void {
    if (this.session.phase !== 'paused') {
      return
    }

    this.session.phase = 'playing'
  }

  finish(): void {
    if (
      this.session.phase === 'finished' ||
      this.session.phase === 'idle'
    ) {
      return
    }

    this.session.phase = 'finished'
    this.session.finishedAt = Date.now()
  }

  getState(): GameSessionState<TState> {
    return {
      ...this.session,
      players: [...this.session.players],
    }
  }

  getPhase(): GamePhase {
    return this.session.phase
  }

  setGameState(nextState: TState): void {
    if (this.session.phase === 'finished') {
      return
    }

    this.session.state = nextState
  }
}

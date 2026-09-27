import { GameSession } from '../GameSession/GameSession'
import type { GamePlayer } from './types'

export class GameEngine {
  createSession<TState>(params: {
    sessionId: string
    gameId: string
    gameVersion: string
    players: GamePlayer[]
    initialState: TState
  }): GameSession<TState> {
    return new GameSession<TState>(params)
  }
}

export const gameEngine = new GameEngine()

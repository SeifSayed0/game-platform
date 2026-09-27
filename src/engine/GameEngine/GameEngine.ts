import { GameSession } from '../GameSession/GameSession'
import type { GamePlayer } from './types'
import type { GameModule } from './GameModule'

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

  createGameSession<
    TState,
    TAction,
    TResult,
  >(
    module: GameModule<TState, TAction, TResult>,
    params: {
      sessionId: string
      players: GamePlayer[]
    },
  ): GameSession<TState> {
    return this.createSession({
      sessionId: params.sessionId,
      gameId: module.definition.id,
      gameVersion: module.definition.version,
      players: params.players,
      initialState: module.createInitialState(),
    })
  }
}

export const gameEngine = new GameEngine()

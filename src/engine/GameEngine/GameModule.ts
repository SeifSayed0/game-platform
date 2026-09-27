import type { GameSession } from '../GameSession/GameSession'
import type { GameDefinition } from '../GameRegistry/types'

export type GameResult<TResult = unknown> = {
  completed: boolean
  score?: number
  data?: TResult
}

export type GameModule<
  TState = unknown,
  TAction = unknown,
  TResult = unknown,
> = {
  definition: GameDefinition

  createInitialState: () => TState

  reduce: (
    state: TState,
    action: TAction,
  ) => TState

  getResult: (
    state: TState,
  ) => GameResult<TResult>

  createSession: (
    session: GameSession<TState>,
  ) => GameSession<TState>
}

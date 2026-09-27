import type { GameModule } from '../../engine/GameEngine'
import { case017 } from './manifest'

export type Case017State = {
  currentStep: number
  solved: boolean
}

export type Case017Action =
  | {
      type: 'ADVANCE'
    }
  | {
      type: 'SOLVE'
    }

export const case017Game: GameModule<
  Case017State,
  Case017Action
> = {
  definition: case017,

  createInitialState: () => ({
    currentStep: 0,
    solved: false,
  }),

  reduce: (state, action) => {
    switch (action.type) {
      case 'ADVANCE':
        return {
          ...state,
          currentStep: state.currentStep + 1,
        }

      case 'SOLVE':
        return {
          ...state,
          solved: true,
        }

      default:
        return state
    }
  },

  getResult: (state) => ({
    completed: state.solved,
    score: state.solved ? 100 : 0,
  }),

  createSession: (session) => session,
}

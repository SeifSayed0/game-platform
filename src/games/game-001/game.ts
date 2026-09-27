import type { GameModule, GameResult } from '../../engine/GameEngine'
import { case017 } from './manifest'

export type Case017EvidenceId =
  | 'phone'
  | 'clock'
  | 'coffee'
  | 'door'
  | 'window'
  | 'camera'
  | 'guard'
  | 'service-stairs'
  | 'note-417'
  | 'account-file'
  | 'adam-message'
  | 'mazen-statement'

export type Case017PersonId =
  | 'adam'
  | 'mazen'
  | 'layla'
  | 'hamdy'

export type Case017Connection = {
  from: string
  to: string
}

export type Case017Deduction = {
  whatHappened: 'murdered' | 'kidnapped' | 'escaped' | 'left-after-fight' | null
  meaningOf217: 'death' | 'entry' | 'plan-start' | 'power-failure' | null
  reason: 'police' | 'crime' | 'protect-self' | 'steal-money' | null
  meaningOf417: 'apartment' | 'phone' | 'financial-account' | 'car' | null
}

export type Case017State = {
  phase: 'investigation' | 'deduction' | 'finished'

  discoveredEvidence: Case017EvidenceId[]
  viewedEvidence: Case017EvidenceId[]

  discoveredPeople: Case017PersonId[]

  connections: Case017Connection[]

  hintsUsed: number

  deduction: Case017Deduction

  result: {
    score: number
    correctAnswers: number
    completed: boolean
  } | null
}

export type Case017Action =
  | {
      type: 'DISCOVER_EVIDENCE'
      evidenceId: Case017EvidenceId
    }
  | {
      type: 'VIEW_EVIDENCE'
      evidenceId: Case017EvidenceId
    }
  | {
      type: 'DISCOVER_PERSON'
      personId: Case017PersonId
    }
  | {
      type: 'ADD_CONNECTION'
      from: string
      to: string
    }
  | {
      type: 'REMOVE_CONNECTION'
      from: string
      to: string
    }
  | {
      type: 'USE_HINT'
    }
  | {
      type: 'OPEN_DEDUCTION'
    }
  | {
      type: 'SUBMIT_DEDUCTION'
      deduction: Case017Deduction
    }

function createInitialState(): Case017State {
  return {
    phase: 'investigation',

    discoveredEvidence: [],

    viewedEvidence: [],

    discoveredPeople: [],

    connections: [],

    hintsUsed: 0,

    deduction: {
      whatHappened: null,
      meaningOf217: null,
      reason: null,
      meaningOf417: null,
    },

    result: null,
  }
}

function addUnique<T>(items: T[], item: T): T[] {
  if (items.includes(item)) {
    return items
  }

  return [...items, item]
}

function removeConnection(
  connections: Case017Connection[],
  from: string,
  to: string,
): Case017Connection[] {
  return connections.filter(
    (connection) =>
      !(
        connection.from === from &&
        connection.to === to
      ),
  )
}

function calculateResult(
  deduction: Case017Deduction,
  hintsUsed: number,
): GameResult<Case017Deduction> {
  const correctAnswers = [
    deduction.whatHappened === 'escaped',
    deduction.meaningOf217 === 'plan-start',
    deduction.reason === 'protect-self',
    deduction.meaningOf417 === 'financial-account',
  ].filter(Boolean).length

  const score = Math.max(
    0,
    correctAnswers * 25 - hintsUsed * 5,
  )

  return {
    completed: true,
    score,
    data: deduction,
  }
}

function reduce(
  state: Case017State,
  action: Case017Action,
): Case017State {
  switch (action.type) {
    case 'DISCOVER_EVIDENCE':
      return {
        ...state,
        discoveredEvidence: addUnique(
          state.discoveredEvidence,
          action.evidenceId,
        ),
      }

    case 'VIEW_EVIDENCE':
      return {
        ...state,
        viewedEvidence: addUnique(
          state.viewedEvidence,
          action.evidenceId,
        ),
      }

    case 'DISCOVER_PERSON':
      return {
        ...state,
        discoveredPeople: addUnique(
          state.discoveredPeople,
          action.personId,
        ),
      }

    case 'ADD_CONNECTION':
      if (
        state.connections.some(
          (connection) =>
            connection.from === action.from &&
            connection.to === action.to,
        )
      ) {
        return state
      }

      return {
        ...state,
        connections: [
          ...state.connections,
          {
            from: action.from,
            to: action.to,
          },
        ],
      }

    case 'REMOVE_CONNECTION':
      return {
        ...state,
        connections: removeConnection(
          state.connections,
          action.from,
          action.to,
        ),
      }

    case 'USE_HINT':
      return {
        ...state,
        hintsUsed: state.hintsUsed + 1,
      }

    case 'OPEN_DEDUCTION':
      return {
        ...state,
        phase: 'deduction',
      }

    case 'SUBMIT_DEDUCTION': {
      const result = calculateResult(
        action.deduction,
        state.hintsUsed,
      )

      return {
        ...state,
        phase: 'finished',
        deduction: action.deduction,
        result: {
          score: result.score ?? 0,
          correctAnswers:
            [
              action.deduction.whatHappened === 'escaped',
              action.deduction.meaningOf217 === 'plan-start',
              action.deduction.reason === 'protect-self',
              action.deduction.meaningOf417 === 'financial-account',
            ].filter(Boolean).length,
          completed: result.completed,
        },
      }
    }

    default:
      return state
  }
}

function getResult(
  state: Case017State,
): GameResult<Case017Deduction> {
  if (!state.result) {
    return {
      completed: false,
    }
  }

  return {
    completed: state.result.completed,
    score: state.result.score,
    data: state.deduction,
  }
}

export const case017Game: GameModule<
  Case017State,
  Case017Action,
  Case017Deduction
> = {
  definition: case017,

  createInitialState,

  reduce,

  getResult,

  createSession: (session) => session,
}

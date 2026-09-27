import type { GameDefinition } from './types'
import { case017 } from '../../games/game-001/manifest'
import { theLastChoice } from '../../games/game-002/manifest'
import { unknownSignal } from '../../games/game-003/manifest'

const gameDefinitions: GameDefinition[] = [
  case017,
  theLastChoice,
  unknownSignal,
]

export function getAllGames(): GameDefinition[] {
  return gameDefinitions
}

export function getGameById(id: string): GameDefinition | undefined {
  return gameDefinitions.find((game) => game.id === id)
}

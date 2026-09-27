import type { GamePlayerMode } from '../../features/games/types'

export type GameDefinition = {
  id: string
  version: string
  title: string
  description: string
  category: string
  players: GamePlayerMode
  duration: string
  cover: string
  status: 'available' | 'coming-soon'
  launch: string
}

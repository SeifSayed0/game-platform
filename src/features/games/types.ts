export type GamePlayerMode = 'solo' | 'duo' | 'solo-duo'

export type GameCardData = {
  id: string
  title: string
  description: string
  category: string
  players: GamePlayerMode
  duration: string
  cover: string
  status?: 'available' | 'coming-soon'
}

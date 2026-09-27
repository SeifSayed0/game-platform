export type GamePlayerMode = 'solo' | 'duo' | 'solo-duo'

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
}

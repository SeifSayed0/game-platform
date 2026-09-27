import type { GameDefinition } from '../../engine/GameRegistry/types'

export type GameCardData = Pick<
  GameDefinition,
  | 'id'
  | 'title'
  | 'description'
  | 'category'
  | 'players'
  | 'duration'
  | 'cover'
  | 'status'
>

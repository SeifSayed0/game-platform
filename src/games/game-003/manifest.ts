import type { GameDefinition } from '../../engine/GameRegistry/types'

export const unknownSignal: GameDefinition = {
  id: 'unknown-signal',
  version: '1.0.0',
  title: 'الإشارة المجهولة',
  description: 'هناك شيء يرسل إشارة... وهناك شخص يستمع.',
  category: 'ألغاز',
  players: 'solo-duo',
  duration: '10–15 دقيقة',
  cover: 'unknown-signal',
  status: 'coming-soon',
  launch: '/games/unknown-signal',
}

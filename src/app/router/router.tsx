import { createBrowserRouter } from 'react-router'
import App from '../../App'
import GameCatalog from '../../features/games/components/GameCatalog'
import GameDetailsPage from '../../features/games/pages/GameDetailsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: GameCatalog,
      },
      {
        path: 'games/:gameId',
        Component: GameDetailsPage,
      },
    ],
  },
])

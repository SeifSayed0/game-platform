import { Link, useParams } from 'react-router'
import { Case017Game } from '../../../games/game-001'
import { getGameById } from '../../../engine/GameRegistry/registry'
import './GamePlayPage.css'

function GamePlayPage() {
  const { gameId } = useParams()
  const game = gameId ? getGameById(gameId) : undefined

  if (!game) {
    return (
      <section className="game-play">
        <div className="game-play__not-found">
          <span>404</span>
          <h1>اللعبة مش موجودة</h1>
          <p>
            اللعبة اللي بتحاول تبدأها مش موجودة في مكتبة المنصة.
          </p>
          <Link to="/">العودة للألعاب</Link>
        </div>
      </section>
    )
  }

  if (game.id === 'case-017') {
    return <Case017Game />
  }

  return (
    <section className="game-play">
      <div className="game-play__not-found">
        <span>قريبًا</span>
        <h1>{game.title}</h1>
        <p>اللعبة دي لسه تحت التطوير.</p>
        <Link to={`/games/${game.id}`}>
          العودة لصفحة اللعبة
        </Link>
      </div>
    </section>
  )
}

export default GamePlayPage

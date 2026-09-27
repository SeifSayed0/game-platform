import { Link, useParams } from 'react-router'
import { getGameById } from '../../../engine/GameRegistry/registry'
import './GameDetailsPage.css'

function GameDetailsPage() {
  const { gameId } = useParams()
  const game = gameId ? getGameById(gameId) : undefined

  if (!game) {
    return (
      <section className="game-details">
        <div className="game-details__not-found">
          <span className="game-details__eyebrow">404</span>

          <h1 className="game-details__title">
            اللعبة مش موجودة
          </h1>

          <p className="game-details__description">
            اللعبة اللي بتحاول تفتحها مش موجودة في مكتبة المنصة.
          </p>

          <Link className="game-details__back" to="/">
            العودة للألعاب
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="game-details">
      <Link className="game-details__back" to="/">
        ← العودة للألعاب
      </Link>

      <div className={`game-details__hero game-details__hero--${game.cover}`}>
        <span className="game-details__category">
          {game.category}
        </span>
      </div>

      <div className="game-details__content">
        <div className="game-details__meta">
          <span>{game.duration}</span>
          <span>•</span>
          <span>لاعب أو لاعبان</span>
          <span>•</span>
          <span>الإصدار {game.version}</span>
        </div>

        <h1 className="game-details__title">
          {game.title}
        </h1>

        <p className="game-details__description">
          {game.description}
        </p>

        {game.status === 'available' ? (
          <button className="game-details__start" type="button">
            ابدأ اللعبة
          </button>
        ) : (
          <button
            className="game-details__start game-details__start--disabled"
            type="button"
            disabled
          >
            قريبًا
          </button>
        )}
      </div>
    </section>
  )
}

export default GameDetailsPage

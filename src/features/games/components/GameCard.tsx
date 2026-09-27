import { Link } from 'react-router'
import type { GameCardData } from '../types'
import './GameCard.css'

type GameCardProps = {
  game: GameCardData
}

function GameCard({ game }: GameCardProps) {
  const isAvailable = game.status === 'available'

  return (
    <article
      className={`game-card ${isAvailable ? 'game-card--clickable' : ''}`}
    >
      <div className={`game-card__cover game-card__cover--${game.cover}`}>
        <span className="game-card__cover-label">
          {game.category}
        </span>

        {!isAvailable && (
          <span className="game-card__status">
            قريبًا
          </span>
        )}
      </div>

      <div className="game-card__body">
        <div className="game-card__meta">
          <span>{game.duration}</span>
          <span>•</span>
          <span>لاعب أو لاعبان</span>
        </div>

        <h2 className="game-card__title">{game.title}</h2>

        <p className="game-card__description">
          {game.description}
        </p>

        {isAvailable ? (
          <Link
            className="game-card__action"
            to={`/games/${game.id}`}
          >
            عرض اللعبة
          </Link>
        ) : (
          <button
            className="game-card__action"
            type="button"
            disabled
          >
            قريبًا
          </button>
        )}
      </div>
    </article>
  )
}

export default GameCard

import type { GameCardData } from '../types'
import './GameCard.css'

type GameCardProps = {
  game: GameCardData
}

function GameCard({ game }: GameCardProps) {
  const isAvailable = game.status === 'available'

  const handleOpen = () => {
    if (!isAvailable) {
      return
    }

    console.log(`Opening game: ${game.id}`)
  }

  return (
    <article
      className={`game-card ${isAvailable ? 'game-card--clickable' : ''}`}
      onClick={handleOpen}
      role={isAvailable ? 'button' : undefined}
      tabIndex={isAvailable ? 0 : undefined}
      onKeyDown={(event) => {
        if (isAvailable && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault()
          handleOpen()
        }
      }}
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

        <button
          className="game-card__action"
          type="button"
          disabled={!isAvailable}
          onClick={(event) => {
            event.stopPropagation()
            handleOpen()
          }}
        >
          {isAvailable ? 'ابدأ اللعب' : 'قريبًا'}
        </button>
      </div>
    </article>
  )
}

export default GameCard

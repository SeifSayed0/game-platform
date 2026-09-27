import { useMemo, useState } from 'react'
import { getAllGames } from '../../../engine/GameRegistry/registry'
import GameCard from './GameCard'
import './GameCatalog.css'

const filters = [
  { id: 'all', label: 'الكل' },
  { id: 'غموض', label: 'غموض' },
  { id: 'ألغاز', label: 'ألغاز' },
  { id: 'قصة', label: 'قصة' },
]

function GameCatalog() {
  const [activeFilter, setActiveFilter] = useState('all')
  const games = getAllGames()

  const filteredGames = useMemo(() => {
    if (activeFilter === 'all') {
      return games
    }

    return games.filter((game) => game.category === activeFilter)
  }, [activeFilter, games])

  return (
    <section className="game-catalog">
      <div className="game-catalog__header">
        <div>
          <span className="game-catalog__eyebrow">مكتبة الألعاب</span>

          <h1 className="game-catalog__title">
            إيه اللي حابب تلعبه؟
          </h1>

          <p className="game-catalog__description">
            ألعاب قصيرة، حكايات غريبة، وحاجات تستاهل تكتشفها.
          </p>
        </div>

        <div className="game-catalog__filters" role="tablist" aria-label="تصفية الألعاب">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`game-catalog__filter ${
                activeFilter === filter.id
                  ? 'game-catalog__filter--active'
                  : ''
              }`}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              role="tab"
              aria-selected={activeFilter === filter.id}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="game-catalog__grid">
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  )
}

export default GameCatalog

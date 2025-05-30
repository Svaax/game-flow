import { useSelector } from 'react-redux'
import { selectFilteredGames } from './shopSlice.js'
import GameCard from './GameCard.jsx'
import Filters from './Filters.jsx'

const GamesList = () => {
    const games = useSelector(selectFilteredGames)
    const status = useSelector(state => state.shop.status)

    if (status === 'loading') {
        return <div>Loading games...</div>
    }

    if (status === 'failed') {
        return <div>Error loading games</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Filters />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {games.map(game => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>
        </div>
    )
}

export default GamesList
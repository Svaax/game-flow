import { useParams } from 'react-router-dom'
import { useGetGameDetailsQuery } from '../features/shop/shopAPI.js'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, addToWishlist } from '../features/shop/shopSlice.js'
import { selectUserRole } from '../features/auth/authSlice.js'
import { Roles } from '../shared/constants.js'
import ReviewsSection from '../features/shop/ReviewsSection.jsx'
import LoadingSpinner from '../shared/components/LoadingSpinner.jsx'

const GamePage = () => {
    const { id } = useParams()
    const { data: game, isLoading, error } = useGetGameDetailsQuery(id)
    const dispatch = useDispatch()
    const role = useSelector(selectUserRole)

    if (isLoading) return <LoadingSpinner />
    if (error) return <div>Error loading game details</div>

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">

                <div className="md:w-1/3">
                    <img
                        src={game.coverImage}
                        alt={game.title}
                        className="w-full rounded-lg shadow-lg"
                    />

                    <div className="mt-4 flex flex-col space-y-3">
                        <span className="text-2xl font-bold">${game.price}</span>

                        <button
                            onClick={() => dispatch(addToCart(game))}
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
                            disabled={role === Roles.GUEST}
                        >
                            {t('addToCart')}
                        </button>

                        <button
                            onClick={() => dispatch(addToWishlist(game))}
                            className="border border-blue-600 text-blue-600 py-2 px-4 rounded hover:bg-blue-50 transition-colors disabled:opacity-50"
                            disabled={role === Roles.GUEST}
                        >
                            {('addToWishlist')}
                        </button>
                    </div>
                </div>

                {/* Правая колонка - информация об игре */}
                <div className="md:w-2/3">
                    <h1 className="text-3xl font-bold mb-4">{game.title}</h1>

                    <div className="mb-6">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {game.genres.map(genre => (
                                <span
                                    key={genre}
                                    className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                                >
                  {genre}
                </span>
                            ))}
                        </div>

                        <p className="text-gray-700 mb-4">{game.description}</p>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <h3 className="font-semibold">{('developer')}</h3>
                                <p>{game.developer}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">{('releaseDate')}</h3>
                                <p>{new Date(game.releaseDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Системные требования */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-4">{('systemRequirements')}</h2>
                        <div className="bg-gray-100 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap font-sans">
                {game.systemRequirements}
              </pre>
                        </div>
                    </div>

                    {/* Отзывы */}
                    <ReviewsSection gameId={id} />
                </div>
            </div>
        </div>
    )
}

export default GamePage
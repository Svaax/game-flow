import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, addToWishlist } from './shopSlice.js'
import { selectUserRole } from '../auth/authSlice.js'
import { Roles } from '../../shared/constants.js'
import { useTranslation } from 'react-i18next'

const GameCard = ({ game }) => {
    const dispatch = useDispatch()
    const role = useSelector(selectUserRole)
    const { t } = useTranslation()

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <Link to={`/game/${game.id}`}>
                <img
                    src={game.coverImage}
                    alt={game.title}
                    className="w-full h-48 object-cover"
                />
            </Link>

            <div className="p-4">
                <Link to={`/game/${game.id}`} className="hover:text-blue-600">
                    <h3 className="text-lg font-semibold mb-2">{game.title}</h3>
                </Link>

                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">{game.genres.join(', ')}</span>
                    <span className="font-bold">${game.price}</span>
                </div>

                <div className="flex space-x-2">
                    <button
                        onClick={() => dispatch(addToCart(game))}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                        disabled={role === Roles.GUEST}
                    >
                        {t('addToCart')}
                    </button>

                    <button
                        onClick={() => dispatch(addToWishlist(game))}
                        className="border border-blue-600 text-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                        disabled={role === Roles.GUEST}
                    >
                        {t('wishlist')}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GameCard
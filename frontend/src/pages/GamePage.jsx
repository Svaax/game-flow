import { useParams } from 'react-router-dom'
import { useGetGameDetailsQuery } from '../features/shop/shopAPI.js'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, addToWishlist, removeFromWishlist } from '../features/shop/shopSlice.js'
import {
    selectUserRole,
    // selectUserId
} from '../features/auth/authSlice.js'
import { selectCartItems, selectWishlistItems } from '../features/shop/shopSlice.js'
import { Roles } from '../shared/constants.js'
import ReviewsSection from '../features/shop/ReviewsSection.jsx'
import LoadingSpinner from '../shared/components/LoadingSpinner.jsx'
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'

const GamePage = () => {
    const { id } = useParams()
    const { data: game, isLoading, error } = useGetGameDetailsQuery(id)
    const dispatch = useDispatch()
    const role = useSelector(selectUserRole)
    // const userId = useSelector(selectUserId)
    const cartItems = useSelector(selectCartItems)
    const wishlistItems = useSelector(selectWishlistItems)

    // Check if game is already in cart or wishlist
    const isInCart = cartItems.some(item => item.game.game_id === parseInt(id))
    const isInWishlist = wishlistItems.some(item => item.game_id === parseInt(id))

    const handleAddToCart = () => {
        if (role === Roles.GUEST) {
            toast.error('Please login to add items to cart')
            return
        }

        if (isInCart) {
            toast.info('Game is already in your cart')
            return
        }

        dispatch(addToCart(game))
        toast.success('Added to cart!')
    }

    const handleWishlistToggle = () => {
        if (role === Roles.GUEST) {
            toast.error('Please login to manage wishlist')
            return
        }

        if (isInWishlist) {
            dispatch(removeFromWishlist(game.game_id))
            toast.success('Removed from wishlist')
        } else {
            dispatch(addToWishlist(game))
            toast.success('Added to wishlist!')
        }
    }

    if (isLoading) return <LoadingSpinner />

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Game</h2>
                    <p className="text-red-600">Unable to load game details. Please try again later.</p>
                </div>
            </div>
        )
    }

    if (!game) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-600">Game not found</h2>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left column - Game image and actions */}
                <div className="lg:w-1/3">
                    <div className="sticky top-4">
                        <img
                            src={game.coverImage || game.cover_image}
                            alt={game.title}
                            className="w-full rounded-lg shadow-lg object-cover aspect-[3/4]"
                            onError={(e) => {
                                e.target.src = '/images/game-placeholder.jpg'
                            }}
                        />

                        <div className="mt-6 space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <span className="text-3xl font-bold text-green-600">
                                    ${game.price}
                                </span>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                                    isInCart
                                        ? 'bg-green-100 text-green-700 border border-green-200'
                                        : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                                } ${role === Roles.GUEST ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                                disabled={role === Roles.GUEST}
                            >
                                <ShoppingCartIcon className="w-5 h-5" />
                                {isInCart ? 'In Cart' : 'Add to Cart'}
                            </button>

                            <button
                                onClick={handleWishlistToggle}
                                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 border ${
                                    isInWishlist
                                        ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                } ${role === Roles.GUEST ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                                disabled={role === Roles.GUEST}
                            >
                                {isInWishlist ? (
                                    <HeartSolidIcon className="w-5 h-5" />
                                ) : (
                                    <HeartIcon className="w-5 h-5" />
                                )}
                                {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                            </button>

                            {role === Roles.GUEST && (
                                <p className="text-sm text-gray-500 text-center">
                                    Please login to purchase or add to wishlist
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right column - Game information */}
                <div className="lg:w-2/3">
                    <div className="mb-6">
                        <h1 className="text-4xl font-bold mb-4 text-gray-900">{game.title}</h1>

                        {/* Genres */}
                        {game.genres && game.genres.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {game.genres.map(genre => (
                                    <span
                                        key={genre}
                                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                                    >
                                        {genre}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-4 text-gray-900">Description</h2>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {game.description}
                            </p>
                        </div>

                        {/* Game Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-900 mb-2">Developer</h3>
                                <p className="text-gray-700">{game.developer || 'Unknown'}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-900 mb-2">Release Date</h3>
                                <p className="text-gray-700">
                                    {game.releaseDate || game.release_date
                                        ? new Date(game.releaseDate || game.release_date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })
                                        : 'TBA'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                    {/*/!* System Requirements *!/*/}
                    {/*{game.systemRequirements && (*/}
                    {/*    <div className="mb-8">*/}
                    {/*        <h2 className="text-xl font-semibold mb-4 text-gray-900">System Requirements</h2>*/}
                    {/*        <div className="bg-gray-50 p-6 rounded-lg border">*/}
                    {/*            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700">*/}
                    {/*                {game.systemRequirements}*/}
                    {/*            </pre>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*)}*/}

                    {/* Reviews Section */}
                    <div className="border-t pt-8">
                        <ReviewsSection gameId={id} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GamePage
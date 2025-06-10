import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart, addToWishlist } from '../shopSlice'

const GameCard = ({ game }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleViewDetails = () => {
        navigate(`/game/${game.game_id}`)
    }

    const handleAddToCart = (e) => {
        e.stopPropagation()
        dispatch(addToCart(game))
    }

    const handleAddToWishlist = (e) => {
        e.stopPropagation()
        dispatch(addToWishlist(game))
    }

    return (
        <div
            className="bg-white shadow rounded-lg overflow-hidden cursor-pointer hover:shadow-md"
            onClick={handleViewDetails}
        >
            <img
                src={game.coverUrl}
                alt={game.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 truncate">{game.title}</h3>
                <p className="text-gray-700 font-medium mb-4">{game.price}₽</p>
                <div className="flex justify-between">
                    <button
                        onClick={handleAddToCart}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    >
                        В корзину
                    </button>
                    <button
                        onClick={handleAddToWishlist}
                        className="px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600 text-sm"
                    >
                        Вишлист
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GameCard

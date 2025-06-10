import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    selectWishlistItems,
    removeFromWishlist
} from '../features/shop/shopSlice'
import { useNavigate } from 'react-router-dom'

const WishlistPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const list = useSelector(selectWishlistItems)

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Вишлист</h1>
            {list.length === 0 ? (
                <p className="text-gray-600">Ваш вишлист пуст.</p>
            ) : (
                <div className="space-y-4">
                    {list.map(game => (
                        <div key={game.game_id} className="flex items-center justify-between p-4 bg-white rounded shadow">
                            <div>
                                <h2 className="text-lg font-medium">{game.title}</h2>
                                <p className="text-gray-500">Цена: {game.price}₽</p>
                            </div>
                            <button
                                onClick={() => dispatch(removeFromWishlist(game.game_id))}
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >Удалить</button>
                        </div>
                    ))}
                </div>
            )}
            <button
                onClick={() => navigate(-1)}
                className="mt-6 text-blue-500 hover:underline"
            >← Вернуться назад</button>
        </div>
    )
}

export default WishlistPage
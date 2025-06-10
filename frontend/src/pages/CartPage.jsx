import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    selectCartItems,
    removeFromCart,
    clearCart
} from '../features/shop/shopSlice'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const items = useSelector(selectCartItems)

    const total = items.reduce((sum, { game }) => sum + (game.price || 0), 0)

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Корзина</h1>
            {items.length === 0 ? (
                <p className="text-gray-600">Ваша корзина пуста.</p>
            ) : (
                <div className="space-y-4">
                    {items.map(({ game }) => (
                        <div key={game.game_id} className="flex items-center justify-between p-4 bg-white rounded shadow">
                            <div>
                                <h2 className="text-lg font-medium">{game.title}</h2>
                                <p className="text-gray-500">Цена: {game.price}₽ </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => dispatch(removeFromCart(game.game_id))}
                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                >Удалить</button>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-between items-center p-4 bg-gray-100 rounded">
                        <span className="text-xl font-semibold">Итого:</span>
                        <span className="text-xl font-semibold">{total}₽</span>
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={() => dispatch(clearCart())}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >Очистить корзину</button>
                        <button
                            onClick={() => {/* TODO: перейти к оплате */}}
                            className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >Оформить заказ</button>
                    </div>
                </div>
            )}
            <button
                onClick={() => navigate(-1)}
                className="mt-6 text-blue-500 hover:underline"
            >← Вернуться назад</button>
        </div>
    )
}

export default CartPage
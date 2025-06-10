import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../cartSlice';

const CartItem = ({ item, game }) => {
    const dispatch = useDispatch();

    return (
        <div className="flex items-center border-b py-4">
            <img
                src={game.image}
                alt={game.title}
                className="w-20 h-20 object-cover rounded mr-4"
            />
            <div className="flex-1">
                <h3 className="font-medium">{game.title}</h3>
                <p className="text-gray-600">${game.price}</p>
            </div>
            <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 hover:text-red-700 ml-4"
            >
                Удалить
            </button>
        </div>
    );
};

export default CartItem;
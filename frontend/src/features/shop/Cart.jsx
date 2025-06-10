// import { useSelector, useDispatch } from 'react-redux'
// import { selectCartItems } from './shopSlice.js'
// // import { removeFromCart, updateQuantity, clearCart } from './shopSlice.js'
// import { selectUserRole } from '../auth/authSlice.js'
// import { Roles } from '../../shared/constants.js'
// import { Link } from 'react-router-dom'
//
// const Cart = () => {
//     const cartItems = useSelector(selectCartItems)
//     const dispatch = useDispatch()
//     const role = useSelector(selectUserRole)
//
//     const totalPrice = cartItems.reduce(
//         (sum, item) => sum + item.price * item.quantity,
//         0
//     )
//
//     if (role === Roles.GUEST) {
//         return (
//             <div className="container mx-auto px-4 py-8 text-center">
//                 <h2 className="text-2xl font-bold mb-4">{('cart')}</h2>
//                 <p className="mb-4">{('loginToAccessCart')}</p>
//                 <Link
//                     to="/login"
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                     {('login')}
//                 </Link>
//             </div>
//         )
//     }
//
//     if (cartItems.length === 0) {
//         return (
//             <div className="container mx-auto px-4 py-8 text-center">
//                 <h2 className="text-2xl font-bold mb-4">{('cart')}</h2>
//                 <p className="mb-4">{('cartIsEmpty')}</p>
//                 <Link
//                     to="/shop"
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                     {('backToShop')}
//                 </Link>
//             </div>
//         )
//     }
//
//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h2 className="text-2xl font-bold mb-6">{('cart')}</h2>
//
//             <div className="flex flex-col lg:flex-row gap-8">
//                 {/* Список товаров */}
//                 <div className="lg:w-2/3">
//                     {cartItems.map(item => (
//                         <div
//                             key={item.id}
//                             className="flex flex-col sm:flex-row border-b py-4 gap-4"
//                         >
//                             <img
//                                 src={item.coverImage}
//                                 alt={item.title}
//                                 className="w-24 h-24 object-cover rounded"
//                             />
//
//                             <div className="flex-1">
//                                 <h3 className="font-semibold">{item.title}</h3>
//                                 <p className="text-gray-600">${item.price}</p>
//
//                                 <div className="flex items-center mt-2">
//                                     <button
//                                         onClick={() => dispatch(updateQuantity({
//                                             id: item.id,
//                                             quantity: Math.max(1, item.quantity - 1)
//                                         }))}
//                                         className="bg-gray-200 px-3 py-1 rounded-l"
//                                     >
//                                         -
//                                     </button>
//
//                                     <span className="bg-gray-100 px-4 py-1">
//                     {item.quantity}
//                   </span>
//
//                                     <button
//                                         onClick={() => dispatch(updateQuantity({
//                                             id: item.id,
//                                             quantity: item.quantity + 1
//                                         }))}
//                                         className="bg-gray-200 px-3 py-1 rounded-r"
//                                     >
//                                         +
//                                     </button>
//
//                                     <button
//                                         onClick={() => dispatch(removeFromCart(item.id))}
//                                         className="ml-auto text-red-600 hover:text-red-800"
//                                     >
//                                         {('remove')}
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//
//                     <button
//                         onClick={() => dispatch(clearCart())}
//                         className="mt-4 text-red-600 hover:text-red-800"
//                     >
//                         {('clearCart')}
//                     </button>
//                 </div>
//
//                 {/* Итого */}
//                 <div className="lg:w-1/3">
//                     <div className="bg-gray-100 p-6 rounded-lg">
//                         <h3 className="text-xl font-semibold mb-4">{('orderSummary')}</h3>
//
//                         <div className="space-y-3 mb-6">
//                             <div className="flex justify-between">
//                                 <span>{('subtotal')}</span>
//                                 <span>${totalPrice.toFixed(2)}</span>
//                             </div>
//
//                             <div className="flex justify-between">
//                                 <span>{('tax')}</span>
//                                 <span>${(totalPrice * 0.2).toFixed(2)}</span>
//                             </div>
//
//                             <div className="border-t pt-3 flex justify-between font-bold">
//                                 <span>{('total')}</span>
//                                 <span>${(totalPrice * 1.2).toFixed(2)}</span>
//                             </div>
//                         </div>
//
//                         <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
//                             {('proceedToCheckout')}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
//
// export default Cart
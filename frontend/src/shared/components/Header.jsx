import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/auth/authSlice';
import CommunityNavItem from "./CommunityNavItem.jsx";

const Header = () => {
    const user = useSelector(selectCurrentUser);
    return (
        <header className="bg-gray-900 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-white hover:text-gray-300">
                    GameFlow
                </Link>

                <nav className="hidden md:flex space-x-6">
                    <NavLink
                        to="/shop"
                        className={({ isActive }) =>
                            `hover:text-gray-300 ${isActive ? 'text-blue-400' : 'text-white'}`
                        }
                    >
                        {('shop')}
                    </NavLink>
                    <CommunityNavItem />
                    {user && (
                        <NavLink
                            to="/library"
                            className={({ isActive }) =>
                                `hover:text-gray-300 ${isActive ? 'text-blue-400' : 'text-white'}`
                            }
                        >
                            {('library')}
                        </NavLink>
                    )}
                </nav>

                <div className="flex items-center space-x-4">

                    {user ? (
                        <div className="flex items-center space-x-3">
                            <Link to="/cart" className="relative">
                                <span className="text-xl">🛒</span>
                                {user.cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                         {user.cartCount}
                                    </span>
                                )}
                            </Link>
                            <Link to="/wishlist" className="relative">
                                <span className="text-xl">💖</span>
                            </Link>

                            <Link
                                to="/profile"
                                className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white"
                            >
                                {user.username.charAt(0).toUpperCase()}
                            </Link>
                        </div>
                    ) : (
                        <Link
                            to="/auth/login"
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                        >
                            {('login')}
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
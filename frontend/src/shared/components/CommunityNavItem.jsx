import { NavLink, Link } from 'react-router-dom';
import { useState, useRef } from 'react';

function CommunityNavItem() {
    const [isOpen, setIsOpen] = useState(false);
    const timerRef = useRef(null);

    const handleMouseEnter = () => {
        clearTimeout(timerRef.current);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timerRef.current = setTimeout(() => setIsOpen(false), 200);
    };

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <NavLink
                to="/community"
                className={({ isActive }) =>
                    `hover:text-gray-300 ${isActive ? 'text-blue-400' : 'text-white'}`
                }
            >
                community
            </NavLink>
            {isOpen && (
                <div
                    className="absolute left-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md z-50 py-2"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <Link to="/community/groups" className="block px-4 py-2 hover:bg-gray-100">Группы</Link>
                    <Link to="/community/forum" className="block px-4 py-2 hover:bg-gray-100">Форум</Link>
                    <Link to="/community/guides" className="block px-4 py-2 hover:bg-gray-100">Гайды</Link>
                </div>
            )}
        </div>
    );
}

export default CommunityNavItem;
import { useSelector, useDispatch } from 'react-redux';
import {useEffect, useState} from "react";
import {
    selectAllGames,
    selectSortedGames,
    selectSortConfig,
    selectEditingGame,
    setSortConfig,
    setEditingGame,
    deleteGame,
    fetchGames
} from '../gamesSlice';
import CreateGameModal from "./CreateGameModal.jsx";
import EditGameModal from "./EditGameModal.jsx";

const GamesTable = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const dispatch = useDispatch();
    const sortedGames = useSelector(selectSortedGames);
    const sortConfig = useSelector(selectSortConfig);
    const editingGame = useSelector(selectEditingGame);

    useEffect(() => {
        dispatch(fetchGames());
    }, [dispatch]);

    const handleSort = (key) => {
        dispatch(setSortConfig(key));
    };

    const handleDelete = (gameId) => {
        dispatch(deleteGame(gameId));
    };

    return (
        <div className="overflow-x-auto">
            <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                Add New Game
            </button>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                <tr className="bg-gray-100">
                    <th
                        className="py-2 px-4 border cursor-pointer"
                        onClick={() => handleSort('game_id')}
                    >
                        ID {sortConfig.key === 'game_id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                        className="py-2 px-4 border cursor-pointer"
                        onClick={() => handleSort('title')}
                    >
                        Title {sortConfig.key === 'title' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                        className="py-2 px-4 border cursor-pointer"
                        onClick={() => handleSort('price')}
                    >
                        Price {sortConfig.key === 'price' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                        className="py-2 px-4 border cursor-pointer"
                        onClick={() => handleSort('release_date')}
                    >
                        Release Date {sortConfig.key === 'release_date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                        className="py-2 px-4 border cursor-pointer"
                        onClick={() => handleSort('is_active')}
                    >
                        Active {sortConfig.key === 'is_active' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="py-2 px-4 border">Actions</th>
                </tr>
                </thead>
                <tbody>
                {sortedGames.map((game) => (
                    <tr key={game.game_id}>
                        <td className="py-2 px-4 border">{game.game_id}</td>
                        <td className="py-2 px-4 border">{game.title}</td>
                        <td className="py-2 px-4 border">${game.price}</td>
                        <td className="py-2 px-4 border">{new Date(game.release_date).toLocaleDateString()}</td>
                        <td className="py-2 px-4 border">{game.is_active ? 'Yes' : 'No'}</td>
                        <td className="py-2 px-4 border space-x-2">
                            <button
                                onClick={() => dispatch(setEditingGame(game))}
                                className="bg-blue-500 text-white px-2 py-1 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(game.game_id)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {editingGame && <EditGameModal/>}

            {isCreateModalOpen && <CreateGameModal onClose={() => setIsCreateModalOpen(false)} />}
        </div>
    );
};

export default GamesTable;
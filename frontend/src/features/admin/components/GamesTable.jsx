import { useState } from 'react';
import { useGetAllGamesQuery, useUpdateGameMutation, useDeleteGameMutation } from '../adminAPI';
import EditGameModal from "./EditGameModal.jsx";
const GamesTable = () => {
    const { data: games, isLoading, error } = useGetAllGamesQuery();
    const [updateGame] = useUpdateGameMutation();
    const [deleteGame] = useDeleteGameMutation();
    const [editingGame, setEditingGame] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'game_id', direction: 'asc' });

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedGames = [...(games || [])].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const handleDelete = async (gameId) => {
        if (window.confirm('Are you sure you want to delete this game?')) {
            try {
                await deleteGame(gameId).unwrap();
            } catch (err) {
                console.error('Failed to delete game:', err);
            }
        }
    };

    if (isLoading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-red-500 py-4">Error: {error.message}</div>;

    return (
        <div className="overflow-x-auto">
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
                    <th className="py-2 px-4 border">Actions</th>
                </tr>
                </thead>
                <tbody>
                {sortedGames.map((game) => (
                    <tr key={game.game_id}>
                        <td className="py-2 px-4 border">{game.game_id}</td>
                        <td className="py-2 px-4 border">{game.title}</td>
                        <td className="py-2 px-4 border">${game.price.toFixed(2)}</td>
                        <td className="py-2 px-4 border">{new Date(game.release_date).toLocaleDateString()}</td>
                        <td className="py-2 px-4 border space-x-2">
                            <button
                                onClick={() => setEditingGame(game)}
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

            {editingGame && (
                <EditGameModal
                    game={editingGame}
                    onClose={() => setEditingGame(null)}
                    onSave={updateGame}
                />
            )}
        </div>
    );
};

export default GamesTable;
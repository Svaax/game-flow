import { useSelector } from 'react-redux'
import { selectAdminGames } from './adminSlice.js'
import { useDeleteGameMutation } from './adminAPI.js'
import { useTranslation } from 'react-i18next'
import EditGameModal from './EditGameModal.jsx'
import { useState } from 'react'

const GamesTable = () => {
    const games = useSelector(selectAdminGames)
    const [deleteGame] = useDeleteGameMutation()
    const { t } = useTranslation()
    const [editingGame, setEditingGame] = useState(null)

    const handleDelete = async (id) => {
        if (window.confirm(t('confirmDeleteGame'))) {
            try {
                await deleteGame(id).unwrap()
            } catch (err) {
                console.error('Failed to delete game:', err)
            }
        }
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            {editingGame && (
                <EditGameModal
                    game={editingGame}
                    onClose={() => setEditingGame(null)}
                />
            )}

            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('title')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('developer')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('price')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('actions')}
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {games.map((game) => (
                    <tr key={game.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                    <img className="h-10 w-10 rounded" src={game.coverImage} alt={game.title} />
                                </div>
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{game.title}</div>
                                    <div className="text-sm text-gray-500">{game.genres.join(', ')}</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {game.developer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${game.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                                onClick={() => setEditingGame(game)}
                                className="text-blue-600 hover:text-blue-900 mr-4"
                            >
                                {t('edit')}
                            </button>
                            <button
                                onClick={() => handleDelete(game.id)}
                                className="text-red-600 hover:text-red-900"
                            >
                                {t('delete')}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default GamesTable
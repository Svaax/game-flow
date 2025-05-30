import { useDispatch } from 'react-redux'
import { useInstallGameMutation, useUninstallGameMutation } from './libraryAPI.js'
import { updateInstallationProgress } from './librarySlice.js'
// import ProgressBar from '../../shared/components/ProgressBar'

const GameCard = ({ game, onClick }) => {
    const [installGame] = useInstallGameMutation()
    const [uninstallGame] = useUninstallGameMutation()
    const dispatch = useDispatch()

    const handleInstall = async () => {
        try {
            // Симуляция прогресса установки (в реальном приложении - WebSocket или polling)
            for (let i = 0; i <= 100; i += 10) {
                setTimeout(() => {
                    dispatch(updateInstallationProgress({ gameId: game.id, progress: i }))
                }, i * 100)
            }

            await installGame(game.id).unwrap()
        } catch (err) {
            console.error('Installation failed:', err)
        }
    }

    const handleUninstall = async () => {
        try {
            await uninstallGame(game.id).unwrap()
        } catch (err) {
            console.error('Uninstallation failed:', err)
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <div
                onClick={onClick}
                className="cursor-pointer"
            >
                <img
                    src={game.coverImage}
                    alt={game.title}
                    className="w-full h-48 object-cover"
                />

                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{game.title}</h3>
                    <div className="flex justify-between text-sm text-gray-600 mb-3">
                        <span>{game.genres.join(', ')}</span>
                        <span>{game.installed ? t('installed') : ''}</span>
                    </div>

                    {game.userProgress && (
                        <div className="mb-3">
                            {/*<ProgressBar*/}
                            {/*    progress={game.userProgress.completion}*/}
                            {/*    label={`${game.userProgress.completion}% ${('completed')}`}*/}
                            {/*/>*/}
                        </div>
                    )}
                </div>
            </div>

            <div className="p-4 border-t">
                {game.installed ? (
                    <button
                        onClick={handleUninstall}
                        className="w-full bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
                    >
                        {('uninstall')}
                    </button>
                ) : (
                    <button
                        onClick={handleInstall}
                        className="w-full bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
                    >
                        {('install')}
                    </button>
                )}
            </div>
        </div>
    )
}

export default GameCard
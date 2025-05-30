import { useSelector, useDispatch } from 'react-redux'
import { selectSelectedGame } from './librarySlice.js'
import { useUpdateGameProgressMutation } from './libraryAPI.js'
import ProgressBar from '../../shared/components/ProgressBar'

const GameDetails = () => {
    const game = useSelector(selectSelectedGame)
    const [updateProgress] = useUpdateGameProgressMutation()
    const dispatch = useDispatch()

    if (!game) return <div className="text-center py-12">{('noGameSelected')}</div>

    const handleProgressChange = async (newProgress) => {
        try {
            await updateProgress({
                gameId: game.id,
                progress: {
                    completion: newProgress,
                    lastPlayed: new Date().toISOString()
                }
            }).unwrap()
        } catch (err) {
            console.error('Failed to update progress:', err)
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                    <img
                        src={game.coverImage}
                        alt={game.title}
                        className="w-full rounded-lg"
                    />
                </div>

                <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold mb-4">{game.title}</h2>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">{('yourProgress')}</h3>
                        <ProgressBar
                            progress={game.userProgress?.completion || 0}
                            onChange={handleProgressChange}
                            editable
                        />

                        <div className="mt-2 text-sm text-gray-600">
                            {game.userProgress?.lastPlayed && (
                                <p>{('lastPlayed')}: {new Date(game.userProgress.lastPlayed).toLocaleDateString()}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <h3 className="font-semibold">{('developer')}</h3>
                            <p>{game.developer}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">{('releaseDate')}</h3>
                            <p>{new Date(game.releaseDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">{('installStatus')}</h3>
                            <p>{game.installed ? t('installed') : t('notInstalled')}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">{('description')}</h3>
                        <p className="text-gray-700">{game.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameDetails
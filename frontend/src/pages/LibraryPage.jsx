import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    selectUserGames,
    selectLibraryStatus,
    selectCollections,
    fetchUserGames,
    fetchCollections,
    setSelectedGame
} from '../features/library/librarySlice.js'
import GameCard from '../features/library/GameCard'
// import CollectionCard from '../features/library/CollectionCard'
import LoadingSpinner from '../shared/components/LoadingSpinner.jsx'
import { Tab } from '@headlessui/react'

const LibraryPage = () => {
    const dispatch = useDispatch()
    const games = useSelector(selectUserGames)
    const collections = useSelector(selectCollections)
    const status = useSelector(selectLibraryStatus)

    useEffect(() => {
        dispatch(fetchUserGames())
        dispatch(fetchCollections())
    }, [dispatch])

    if (status === 'loading') return <LoadingSpinner />

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">{('gameLibrary')}</h1>

            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-lg bg-gray-200 p-1 mb-6">
                    <Tab className={({ selected }) =>
                        `w-full py-2 rounded-md text-sm font-medium ${
                            selected ? 'bg-white shadow text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                        }`
                    }>
                        {('myGames')}
                    </Tab>
                    <Tab className={({ selected }) =>
                        `w-full py-2 rounded-md text-sm font-medium ${
                            selected ? 'bg-white shadow text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                        }`
                    }>
                        {('collections')}
                    </Tab>
                </Tab.List>

                <Tab.Panels>
                    {/* Вкладка "Мои игры" */}
                    <Tab.Panel>
                        {games.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-600 mb-4">{('noGamesInLibrary')}</p>
                                <a
                                    href="/shop"
                                    className="text-blue-600 hover:underline"
                                >
                                    {('visitShop')}
                                </a>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {games.map(game => (
                                    <GameCard
                                        key={game.id}
                                        game={game}
                                        onClick={() => dispatch(setSelectedGame(game))}
                                    />
                                ))}
                            </div>
                        )}
                    </Tab.Panel>

                    {/* Вкладка "Коллекции" */}
                    <Tab.Panel>
                        <div className="mb-6">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                {('createNewCollection')}
                            </button>
                        </div>

                        {collections.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-600">{('noCollections')}</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {collections.map(collection => (
                                    <CollectionCard
                                        key={collection.id}
                                        collection={collection}
                                    />
                                ))}
                            </div>
                        )}
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

export default LibraryPage
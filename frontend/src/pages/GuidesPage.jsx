import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PlusIcon, XMarkIcon, BookOpenIcon, UserIcon, CalendarIcon, PuzzlePieceIcon as GamepadIcon } from '@heroicons/react/24/outline'
import {
    fetchGuides,
    createGuide,
    selectAllGuides,
    selectGuidesStatus,
    selectGuidesError
} from '../features/community/guidesSlice'
import { selectCurrentUser } from '../features/auth/authSlice'
import { fetchGames, selectAllGames } from '../features/admin/gamesSlice'
import LoadingSpinner from '../shared/components/LoadingSpinner'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const GuidesPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Form state
    const [selectedGameId, setSelectedGameId] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [tags, setTags] = useState('')

    // Filter state
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedFilter, setSelectedFilter] = useState('all') // all, my-guides, game

    // Redux selectors
    const guides = useSelector(selectAllGuides)
    const status = useSelector(selectGuidesStatus)
    const error = useSelector(selectGuidesError)
    const games = useSelector(selectAllGames)
    const user = useSelector(selectCurrentUser)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchGuides())
            dispatch(fetchGames())
        }
    }, [dispatch, status])

    const openModal = () => {
        if (!user) {
            toast.error('Please log in to create a guide')
            return
        }
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedGameId('')
        setTitle('')
        setContent('')
        setTags('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!selectedGameId || !title.trim() || !content.trim()) {
            toast.error('Please fill in all required fields')
            return
        }

        setIsSubmitting(true)

        const newGuide = {
            user_id: user.id,
            game_id: parseInt(selectedGameId, 10),
            title: title.trim(),
            content: content.trim(),
            tags: tags.trim() ? tags.split(',').map(tag => tag.trim()) : []
        }

        try {
            await dispatch(createGuide(newGuide)).unwrap()
            toast.success('Guide created successfully!')
            closeModal()
        } catch (error) {
            toast.error('Failed to create guide')
        } finally {
            setIsSubmitting(false)
        }
    }

    // Filter guides based on search and filters
    const filteredGuides = guides.filter(guide => {
        const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            guide.content.toLowerCase().includes(searchTerm.toLowerCase())

        if (!matchesSearch) return false

        switch (selectedFilter) {
            case 'my-guides':
                return guide.user_id === user?.id
            case 'game':
                return selectedGameId ? guide.game_id === parseInt(selectedGameId) : true
            default:
                return true
        }
    })

    const getGameTitle = (gameId) => {
        const game = games.find(g => g.game_id === gameId)
        return game?.title || 'Unknown Game'
    }

    if (status === 'loading' && guides.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <BookOpenIcon className="w-8 h-8 text-blue-600" />
                            Game Guides
                        </h1>
                        <p className="text-gray-600 mt-1">Share your gaming knowledge and discover new strategies</p>
                    </div>

                    <button
                        onClick={openModal}
                        className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Create Guide
                    </button>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search guides..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => setSelectedFilter('all')}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    selectedFilter === 'all'
                                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                All Guides
                            </button>
                            {user && (
                                <button
                                    onClick={() => setSelectedFilter('my-guides')}
                                    className={`px-4 py-2 rounded-lg transition-colors ${
                                        selectedFilter === 'my-guides'
                                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    My Guides
                                </button>
                            )}
                        </div>

                        {/* Game Filter */}
                        <div className="min-w-48">
                            <select
                                value={selectedGameId}
                                onChange={(e) => setSelectedGameId(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">All Games</option>
                                {games.map(game => (
                                    <option key={game.game_id} value={game.game_id}>
                                        {game.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Error State */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700">Error: {error}</p>
                    </div>
                )}

                {/* Guides Grid */}
                {filteredGuides.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredGuides.map((guide) => (
                            <div
                                key={guide.guide_id || guide.id}
                                onClick={() => navigate(`/guides/${guide.guide_id || guide.id}`)}
                                className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                                            {guide.title}
                                        </h3>
                                        <GamepadIcon className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                                    </div>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {guide.content}
                                    </p>

                                    <div className="space-y-2">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <GamepadIcon className="w-4 h-4 mr-2" />
                                            {getGameTitle(guide.game_id)}
                                        </div>

                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <UserIcon className="w-4 h-4 mr-1" />
                                                Author #{guide.user_id}
                                            </div>
                                            {guide.created_at && (
                                                <div className="flex items-center">
                                                    <CalendarIcon className="w-4 h-4 mr-1" />
                                                    {new Date(guide.created_at).toLocaleDateString()}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <BookOpenIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {searchTerm || selectedFilter !== 'all' ? 'No guides found' : 'No guides yet'}
                        </h3>
                        <p className="text-gray-500 mb-4">
                            {searchTerm || selectedFilter !== 'all'
                                ? 'Try adjusting your search or filters'
                                : 'Be the first to create a helpful game guide!'}
                        </p>
                        {!searchTerm && selectedFilter === 'all' && (
                            <button
                                onClick={openModal}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <PlusIcon className="w-5 h-5" />
                                Create First Guide
                            </button>
                        )}
                    </div>
                )}

                {/* Create Guide Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900">Create New Guide</h2>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <form onSubmit={handleSubmit} className="p-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Left Column */}
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="game" className="block text-sm font-medium text-gray-700 mb-2">
                                                Game *
                                            </label>
                                            <select
                                                id="game"
                                                value={selectedGameId}
                                                onChange={(e) => setSelectedGameId(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            >
                                                <option value="">Select a game</option>
                                                {games.map(game => (
                                                    <option key={game.game_id} value={game.game_id}>
                                                        {game.title}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                                Guide Title *
                                            </label>
                                            <input
                                                id="title"
                                                type="text"
                                                placeholder="e.g., Complete Beginner's Guide to..."
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                maxLength={200}
                                                required
                                            />
                                            <div className="text-right text-xs text-gray-500 mt-1">
                                                {title.length}/200
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                                                Tags (optional)
                                            </label>
                                            <input
                                                id="tags"
                                                type="text"
                                                placeholder="strategy, tips, walkthrough (comma separated)"
                                                value={tags}
                                                onChange={(e) => setTags(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                                Separate tags with commas
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div>
                                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                                            Guide Content *
                                        </label>
                                        <textarea
                                            id="content"
                                            placeholder="Write your comprehensive guide here. Include step-by-step instructions, tips, strategies, and any helpful information for other players..."
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                            rows={12}
                                            maxLength={10000}
                                            required
                                        />
                                        <div className="text-right text-xs text-gray-500 mt-1">
                                            {content.length}/10000
                                        </div>
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                                        disabled={isSubmitting || !selectedGameId || !title.trim() || !content.trim()}
                                    >
                                        {isSubmitting && <LoadingSpinner size="sm" />}
                                        {isSubmitting ? 'Publishing...' : 'Publish Guide'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default GuidesPage
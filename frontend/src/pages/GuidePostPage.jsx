import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchGuideById,
    selectCurrentGuide,
    selectGuidesStatus,
    selectGuidesError,
    likeGuide,
    fetchGuideComments,
    selectGuideComments,
    clearCurrentGuide
} from '../features/community/guidesSlice'
import { fetchGameById, selectCurrentGame } from '../features/admin/gamesSlice'
import { useParams, useNavigate } from 'react-router-dom'
import { HeartIcon, ChatBubbleLeftIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import LoadingSpinner from '../shared/components/LoadingSpinner'

const GuidePostPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const guide = useSelector(selectCurrentGuide)
    const status = useSelector(selectGuidesStatus)
    const error = useSelector(selectGuidesError)
    const game = useSelector(selectCurrentGame)
    const comments = useSelector(state => selectGuideComments(state, parseInt(id)))

    const [isLiking, setIsLiking] = useState(false)

    // Mock user ID - replace with actual auth
    const currentUserId = 1

    useEffect(() => {
        const guideId = parseInt(id, 10)
        dispatch(fetchGuideById(guideId))
        dispatch(fetchGuideComments(guideId))

        return () => {
            dispatch(clearCurrentGuide())
        }
    }, [dispatch, id])

    useEffect(() => {
        if (guide?.game_id) {
            dispatch(fetchGameById(guide.game_id))
        }
    }, [dispatch, guide?.game_id])

    const handleLike = async () => {
        if (isLiking || !guide) return

        setIsLiking(true)
        try {
            await dispatch(likeGuide({
                guideId: guide.id,
                userId: currentUserId
            })).unwrap()
        } catch (err) {
            console.error('Failed to like guide:', err)
        } finally {
            setIsLiking(false)
        }
    }

    const handleBack = () => {
        navigate(-1)
    }

    if (status === 'loading' || !guide) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <LoadingSpinner />
            </div>
        )
    }

    if (status === 'failed') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-xl mb-4">
                        Ошибка загрузки гайда
                    </div>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={handleBack}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Назад
                    </button>
                </div>
            </div>
        )
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-6">
                    <button
                        onClick={handleBack}
                        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-2" />
                        Назад
                    </button>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Guide Header */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {guide.title}
                                </h1>
                                <div className="flex items-center text-sm text-gray-500 space-x-4">
                                    <span>Игра: {game?.title || 'Загрузка...'}</span>
                                    <span>•</span>
                                    <span>Автор: {guide.author_name || 'Аноним'}</span>
                                    <span>•</span>
                                    <span>{formatDate(guide.created_at)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleLike}
                                disabled={isLiking}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                                    guide.isLiked
                                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                } ${isLiking ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {guide.isLiked ? (
                                    <HeartSolidIcon className="w-5 h-5" />
                                ) : (
                                    <HeartIcon className="w-5 h-5" />
                                )}
                                <span>{guide.likes || 0}</span>
                            </button>

                            <div className="flex items-center space-x-2 text-gray-500">
                                <ChatBubbleLeftIcon className="w-5 h-5" />
                                <span>{comments.length} комментариев</span>
                            </div>
                        </div>
                    </div>

                    {/* Guide Content */}
                    <div className="p-6">
                        <div className="prose prose-lg max-w-none">
                            {guide.content.split('\n').map((paragraph, index) => (
                                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Tags */}
                        {guide.tags && guide.tags.length > 0 && (
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="flex flex-wrap gap-2">
                                    {guide.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Comments Section */}
                <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Комментарии ({comments.length})
                        </h2>
                    </div>

                    <div className="p-6">
                        {comments.length > 0 ? (
                            <div className="space-y-6">
                                {comments.map((comment) => (
                                    <div key={comment.id} className="flex space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                                <span className="text-gray-600 font-medium">
                                                    {comment.author_name?.charAt(0) || 'A'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <span className="font-medium text-gray-900">
                                                    {comment.author_name || 'Аноним'}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {formatDate(comment.created_at)}
                                                </span>
                                            </div>
                                            <p className="text-gray-700">{comment.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <ChatBubbleLeftIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500">Пока нет комментариев</p>
                                <p className="text-sm text-gray-400">Будьте первым, кто оставит комментарий!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GuidePostPage
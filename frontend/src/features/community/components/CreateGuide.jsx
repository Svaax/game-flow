import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createGuide, selectGuidesError } from '../features/community/guidesSlide'
import { fetchGameById, selectCurrentGame } from '../features/admin/gamesSlice'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const CreateGuide = () => {
    const { gameId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const game = useSelector(selectCurrentGame)
    const error = useSelector(selectGuidesError)

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [tags, setTags] = useState([])
    const [currentTag, setCurrentTag] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Mock user ID - replace with actual auth
    const currentUserId = 1

    useEffect(() => {
        if (gameId) {
            dispatch(fetchGameById(parseInt(gameId)))
        }
    }, [dispatch, gameId])

    const handleAddTag = () => {
        if (currentTag.trim() && !tags.includes(currentTag.trim()) && tags.length < 5) {
            setTags([...tags, currentTag.trim()])
            setCurrentTag('')
        }
    }

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove))
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && currentTag.trim()) {
            e.preventDefault()
            handleAddTag()
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title.trim() || !content.trim()) {
            toast.error('Заполните все обязательные поля')
            return
        }

        if (content.trim().length < 50) {
            toast.error('Содержание гайда должно содержать минимум 50 символов')
            return
        }

        setIsSubmitting(true)

        try {
            const guideData = {
                title: title.trim(),
                content: content.trim(),
                gameId: parseInt(gameId),
                userId: currentUserId,
                tags: tags
            }

            const result = await dispatch(createGuide(guideData)).unwrap()

            toast.success('Гайд успешно создан!')
            navigate(`/guides/${result.id}`)
        } catch (err) {
            console.error('Failed to create guide:', err)
            toast.error(err || 'Не удалось создать гайд')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleBack = () => {
        if (title.trim() || content.trim()) {
            if (window.confirm('У вас есть несохраненные изменения. Вы уверены, что хотите покинуть страницу?')) {
                navigate(-1)
            }
        } else {
            navigate(-1)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={handleBack}
                        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-2" />
                        Назад
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Создать новый гайд
                        </h1>
                        <p className="text-gray-600">
                            Игра: {game?.title || 'Загрузка...'}
                        </p>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Заголовок гайда *
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                placeholder="Введите заголовок вашего гайда..."
                                maxLength={100}
                                required
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                {title.length}/100 символов
                            </p>
                        </div>

                        {/* Content */}
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                                Содержание гайда *
                            </label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
                                placeholder="Напишите подробное описание вашего гайда..."
                                rows={12}
                                minLength={50}
                                required
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                {content.length} символов (минимум 50)
                            </p>
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Теги (необязательно)
                            </label>

                            {/* Tag Input */}
                            <div className="flex gap-2 mb-3">
                                <input
                                    type="text"
                                    value={currentTag}
                                    onChange={(e) => setCurrentTag(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    placeholder="Добавить тег..."
                                    maxLength={20}
                                    disabled={tags.length >= 5}
                                />
                                <button
                                    type="button"
                                    onClick={handleAddTag}
                                    disabled={!currentTag.trim() || tags.includes(currentTag.trim()) || tags.length >= 5}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center"
                                >
                                    <PlusIcon className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Current Tags */}
                            {tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTag(tag)}
                                                className="ml-2 text-blue-600 hover:text-blue-800"
                                            >
                                                <XMarkIcon className="w-4 h-4" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}

                            <p className="text-sm text-gray-500">
                                {tags.length}/5 тегов. Нажмите Enter или кнопку "+" для добавления.
                            </p>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-4 border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={isSubmitting || !title.trim() || !content.trim() || content.trim().length < 50}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                            >
                                {isSubmitting ? 'Создание...' : 'Создать гайд'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateGuide
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { selectForumPosts, createForumPost, fetchForumPosts, selectForumStatus, selectForumError } from '../features/community/forumSlice.js'
import { selectCurrentUser, selectAllUsers, fetchUsers } from '../features/auth/authSlice'
import LoadingSpinner from '../shared/components/LoadingSpinner'
import ForumPost from '../features/community/components/ForumPost'
import toast from 'react-hot-toast'

const ForumPage = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const dispatch = useDispatch()
    const posts = useSelector(selectForumPosts)
    const status = useSelector(selectForumStatus)
    const error = useSelector(selectForumError)
    const user = useSelector(selectCurrentUser)
    const users = useSelector(selectAllUsers)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers())
            dispatch(fetchForumPosts())
        }
    }, [dispatch, status])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title.trim() || !content.trim()) {
            toast.error('Please fill in all fields')
            return
        }

        if (!user?.id) {
            toast.error('You must be logged in to create a post')
            return
        }

        setIsSubmitting(true)

        const newPost = {
            user_id: user.id,
            title: title.trim(),
            content: content.trim(),
        }

        try {
            await dispatch(createForumPost(newPost)).unwrap()
            setTitle('')
            setContent('')
            setIsModalOpen(false)
            toast.success('Post created successfully!')
        } catch (error) {
            toast.error('Failed to create post')
        } finally {
            setIsSubmitting(false)
        }
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setTitle('')
        setContent('')
    }

    if (status === 'loading' && posts.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Game Forum</h1>
                        <p className="text-gray-600 mt-1">Discuss games, share tips, and connect with fellow gamers</p>
                    </div>

                    {user && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                        >
                            <PlusIcon className="w-5 h-5" />
                            Create Post
                        </button>
                    )}
                </div>

                {/* Error State */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700">Error: {error}</p>
                    </div>
                )}

                {/* Posts List */}
                <div className="space-y-6">
                    {posts && posts.length > 0 ? (
                        posts.map(post => {
                            const author = users.find(u => u.user_id === post.user_id)
                            return (
                                <ForumPost
                                    key={post.id}
                                    post={post}
                                    authorName={author?.username || 'Unknown User'}
                                />
                            )
                        })
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                            <p className="text-gray-500">Be the first to start a discussion!</p>
                        </div>
                    )}
                </div>

                {/* Create Post Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900">Create New Post</h2>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <form onSubmit={handleSubmit} className="p-6">
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                            Title
                                        </label>
                                        <input
                                            id="title"
                                            type="text"
                                            placeholder="What's your topic about?"
                                            value={title}
                                            onChange={e => setTitle(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                            maxLength={200}
                                        />
                                        <div className="text-right text-xs text-gray-500 mt-1">
                                            {title.length}/200
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                                            Content
                                        </label>
                                        <textarea
                                            id="content"
                                            placeholder="Share your thoughts, questions, or discussions about games..."
                                            value={content}
                                            onChange={e => setContent(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                                            rows={6}
                                            maxLength={2000}
                                        />
                                        <div className="text-right text-xs text-gray-500 mt-1">
                                            {content.length}/2000
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
                                        disabled={isSubmitting || !title.trim() || !content.trim()}
                                    >
                                        {isSubmitting && <LoadingSpinner size="sm" />}
                                        {isSubmitting ? 'Publishing...' : 'Publish Post'}
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

export default ForumPage
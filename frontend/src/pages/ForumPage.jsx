import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectForumPosts, selectCommunityStatus } from '../features/community/communitySlice.js'
import { useCreateForumPostMutation } from '../features/community/communityAPI.js'
import { selectUserRole } from '../features/auth/authSlice.js'
import { Roles } from '../shared/constants.js'
import LoadingSpinner from '../shared/components/LoadingSpinner.jsx'
import ForumPost from '../features/community/ForumPost'

const ForumPage = () => {
    const [postText, setPostText] = useState('')
    const [title, setTitle] = useState('')
    const dispatch = useDispatch()
    const posts = useSelector(selectForumPosts)
    const status = useSelector(selectCommunityStatus)
    const [createPost] = useCreateForumPostMutation()
    const role = useSelector(selectUserRole)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title.trim() || !postText.trim()) return

        try {
            const newPost = await createPost({
                title,
                content: postText
            }).unwrap()
            dispatch(addForumPost(newPost))
            setTitle('')
            setPostText('')
        } catch (err) {
            console.error('Failed to create post:', err)
        }
    }

    if (status === 'loading') return <LoadingSpinner />

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">{('communityForum')}</h1>

            {role !== Roles.GUEST && (
                <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">{('createNewPost')}</h2>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={t('postTitle')}
                        className="w-full p-3 border rounded mb-3"
                        required
                    />

                    <textarea
                        value={postText}
                        onChange={(e) => setPostText(e.target.value)}
                        placeholder={('postContent')}
                        className="w-full p-3 border rounded mb-3"
                        rows="5"
                        required
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        {t('publishPost')}
                    </button>
                </form>
            )}

            <div className="space-y-6">
                {posts.map(post => (
                    <ForumPost key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}

export default ForumPage
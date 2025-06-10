import { Link } from 'react-router-dom'
const ForumPost = ({ post, authorName = 'Nobody' } ) => {
    const date = new Date(post.created_at).toLocaleDateString()

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-start gap-4">
                <div className="flex-1">
                    <Link to={`/community/forum/post/${post.post_id}`} className="hover:underline">
                        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    </Link>

                    <p className="text-gray-700 mb-4">{post.content}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <div>
                            <Link
                                to={`/profile/${post.user_id}`}
                                className="text-blue-600 hover:underline"
                            >
                                {authorName}

                            </Link>
                            <span className="mx-2">•</span>
                            <span>{date}</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <span>{post.commentsCount || 0} {('comments')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForumPost
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchGroupById,
    fetchGroupPosts,
    createPost,
    clearError,
    selectCurrentGroup,
    selectGroupPosts,
    selectGroupsLoading,
    selectGroupsError,
    selectPostCreating,
    selectPostError
} from '../features/community/groupsSlice.js';
import { selectCurrentUser } from '../features/auth/authSlice.js';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../shared/components/LoadingSpinner.jsx';
import {
    PlusIcon,
    UserGroupIcon,
    ChatBubbleLeftEllipsisIcon,
    CalendarIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import { UserGroupIcon as UserGroupSolidIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

export default function GroupPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const currentGroup = useSelector(selectCurrentGroup);
    const posts = useSelector(selectGroupPosts);
    const loading = useSelector(selectGroupsLoading);
    const error = useSelector(selectGroupsError);
    const postCreating = useSelector(selectPostCreating);
    const postError = useSelector(selectPostError);
    const user = useSelector(selectCurrentUser);

    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');

    useEffect(() => {
        if (id) {
            dispatch(fetchGroupById(id));
            dispatch(fetchGroupPosts(id));
        }

        return () => {
            dispatch(clearError());
        };
    }, [dispatch, id]);

    useEffect(() => {
        if (postError) {
            toast.error(postError);
        }
    }, [postError]);

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!postTitle.trim() || !postContent.trim()) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            await dispatch(createPost({
                groupId: id,
                postData: {
                    title: postTitle.trim(),
                    content: postContent.trim(),
                    author_id: user.user_id || user.id
                }
            })).unwrap();

            toast.success('Post created successfully!');
            setIsPostModalOpen(false);
            setPostTitle('');
            setPostContent('');
        } catch (error) {
            toast.error('Failed to create post');
        }
    };

    const closePostModal = () => {
        setIsPostModalOpen(false);
        setPostTitle('');
        setPostContent('');
    };

    if (loading) return <LoadingSpinner />;

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Group</h2>
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    if (!currentGroup) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-600">Group not found</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Group Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {currentGroup.name}
                        </h1>
                        <p className="text-gray-600 text-lg mb-4">
                            {currentGroup.description}
                        </p>

                        <div className="flex items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                                <UserGroupIcon className="w-4 h-4" />
                            </div>
                            <div className="flex items-center gap-1">
                                <CalendarIcon className="w-4 h-4" />
                                <span>
                                    Created {currentGroup.created_at
                                    ? new Date(currentGroup.created_at).toLocaleDateString()
                                    : 'Unknown'
                                }
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        {user && (
                            <>
                                {currentGroup.isMember ? (
                                    <button
                                        onClick={handleLeaveGroup}
                                        className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                                    >
                                        <UserGroupIcon className="w-4 h-4" />
                                        Leave Group
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleJoinGroup}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <UserGroupSolidIcon className="w-4 h-4" />
                                        Join Group
                                    </button>
                                )}

                                {(currentGroup.isMember || currentGroup.created_by === (user.user_id || user.id)) && (
                                    <button
                                        onClick={() => setIsPostModalOpen(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        <PlusIcon className="w-4 h-4" />
                                        Create Post
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Posts Section */}
            <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                        <ChatBubbleLeftEllipsisIcon className="w-5 h-5" />
                        Posts ({posts.length})
                    </h2>
                </div>

                {posts.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        <ChatBubbleLeftEllipsisIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg">No posts yet</p>
                        <p className="text-sm">Be the first to start a discussion!</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {posts.map(post => (
                            <div key={post.post_id || post.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between items-start mb-3">
                                    <Link
                                        to={`/community/posts/${post.post_id || post.id}`}
                                        className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                                    >
                                        {post.title}
                                    </Link>
                                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                                        {post.created_at
                                            ? new Date(post.created_at).toLocaleDateString()
                                            : 'Unknown date'
                                        }
                                    </span>
                                </div>

                                <p className="text-gray-700 mb-3 line-clamp-3">
                                    {post.content?.slice(0, 200)}
                                    {post.content?.length > 200 && '...'}
                                </p>

                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <span>By {post.author_name || post.username || 'Anonymous'}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Create Post Modal */}
            {isPostModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Create New Post</h2>
                            <button
                                onClick={closePostModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleCreatePost} className="p-6">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Post Title
                                </label>
                                <input
                                    type="text"
                                    value={postTitle}
                                    onChange={(e) => setPostTitle(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter post title..."
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Content
                                </label>
                                <textarea
                                    value={postContent}
                                    onChange={(e) => setPostContent(e.target.value)}
                                    rows={8}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                                    placeholder="Write your post content..."
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={closePostModal}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    disabled={postCreating}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                    disabled={postCreating}
                                >
                                    {postCreating ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Creating...
                                        </>
                                    ) : (
                                        'Create Post'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
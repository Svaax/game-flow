import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostComments } from '../groupsSlice.js';
import { useParams } from 'react-router-dom';

export default function PostCommentsPage() {
    const { id } = useParams(); // post id
    const dispatch = useDispatch();
    const { posts, comments, loading, error } = useSelector(state => state.groups);
    const post = posts.find(p => p.id === parseInt(id));

    useEffect(() => {
        dispatch(fetchPostComments(id));
    }, [dispatch, id]);

    if (loading) return <div>Загрузка комментариев...</div>;
    if (error) return <div className="text-red-500">Ошибка: {error}</div>;

    return (
        <div className="p-4">
            {post && (
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                    <p className="mt-2 text-gray-800">{post.content}</p>
                </div>
            )}
            <h2 className="text-xl font-semibold mb-3">Комментарии</h2>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id} className="border p-3 rounded mb-2">
                        <p className="font-medium">{comment.authorName}</p>
                        <p className="text-sm text-gray-700">{comment.text}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser, logout } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
    const user = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // useEffect(() => {
    //     // Загрузить данные пользователя, включая группы
    //     dispatch(fetchCurrentUser())
    // }, [dispatch])

    useEffect(() => {
        if (!user) {
            // if not logged in, redirect to login
            navigate('/login')
        }
    }, [user, navigate])

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    if (!user) return null

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                        {user.avatarUrl ? (
                            <img
                                src={user.avatarUrl}
                                alt="User Avatar"
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500">
                                <span className="text-2xl">{user.username.charAt(0)}</span>
                            </div>
                        )}
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">{user.username}</h2>
                    <p className="text-gray-600 mb-2">{user.email}</p>

                    {/* Новые данные: полное имя и группы */}
                    {user.fullName && (
                        <p className="text-gray-800 mb-2">Имя: {user.fullName}</p>
                    )}
                    {user.groups && user.groups.length > 0 && (
                        <div className="mb-4 w-full">
                            <h3 className="font-medium text-gray-700 mb-1">Группы:</h3>
                            <ul className="list-disc list-inside">
                                {user.groups.map(group => (
                                    <li key={group.id}>
                                        <a
                                            href={`/groups/${group.id}`}
                                            className="text-blue-500 hover:underline"
                                        >
                                            {group.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage

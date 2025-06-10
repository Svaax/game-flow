import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    fetchGroups,
    createGroup,
    selectGroupsList
} from '../features/community/groupsSlice'
import LoadingSpinner from '../shared/components/LoadingSpinner'
import { useNavigate } from 'react-router-dom'
import { selectCurrentUser } from '../features/auth/authSlice.js'

const GroupsPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const groups = useSelector(selectGroupsList)
    const user = useSelector(selectCurrentUser)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        dispatch(fetchGroups())
    }, [dispatch])

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => {
        setIsModalOpen(false)
        setName('')
        setDescription('')
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if (!name.trim()) return
        const newGroup = {
            name: name.trim(),
            description: description.trim(),
            created_by: user.id
        }
        console.log(newGroup)
        await dispatch(createGroup(newGroup))
        closeModal()
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Группы</h1>

            <button
                onClick={openModal}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-6"
            >
                Создать группу
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Новая группа</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Название группы"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full mb-2 p-2 border rounded"
                                required
                            />
                            <textarea
                                placeholder="Описание (необязательно)"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                className="w-full mb-4 p-2 border rounded"
                                rows={3}
                            />
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 mr-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                >
                                    Отмена
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Создать
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Список групп */}
            {!groups ? (
                <LoadingSpinner />
            ) : (
                <ul className="space-y-2">
                    {groups.map(group => {
                        const groupId = group.group_id || 1235 ;
                        const groupName = group.name;
                        const groupDesc = group.description;
                        // Guard against incomplete group object

                        if (!groupName) return null;
                        return (
                            <li
                                key={groupId}
                                className="p-4 border rounded hover:bg-gray-50 cursor-pointer"
                                onClick={() => navigate(`/community/groups/${groupId}`)}
                            >
                                <h3 className="text-lg font-medium">{groupName}</h3>
                                {groupDesc && (
                                    <p className="text-gray-600 text-sm mt-1">{groupDesc}</p>
                                )}
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

export default GroupsPage

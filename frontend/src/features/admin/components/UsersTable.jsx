import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import EditUserModal from "./EditUserModal.jsx";
import {
    selectAllUsers,
    selectSortedUsers,
    selectSortConfig,
    selectEditingUser,
    setSortConfig,
    setEditingUser,
    deleteUser,
    fetchUsers
} from '../usersSlice';

const UsersTable = () => {
    const dispatch = useDispatch();
    const sortedUsers = useSelector(selectSortedUsers);
    const sortConfig = useSelector(selectSortConfig);
    const editingUser = useSelector(selectEditingUser);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleSort = (key) => {
        dispatch(setSortConfig(key));
    };
    const handleDelete = (userId) => {
        dispatch(deleteUser(userId));
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                <tr className="bg-gray-100">
                    <th
                        className="py-2 px-4 border cursor-pointer"
                        onClick={() => handleSort('user_id')}
                    >
                        ID {sortConfig.key === 'user_id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                        className="py-2 px-4 border cursor-pointer"
                        onClick={() => handleSort('username')}
                    >
                        Title {sortConfig.key === 'username' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                        className="py-2 px-4 border cursor-pointer"
                        onClick={() => handleSort('email')}
                    >
                        Price {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                   <th
                       className="py-2 px-4 border cursor-pointer"
                       onClick={() => handleSort('role')}
                   >
                        Role {sortConfig.key === 'role' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="py-2 px-4 border">Actions</th>
                </tr>
                </thead>
                <tbody>
                {sortedUsers.map((user) => (
                    <tr key={user.user_id}>
                        <td className="py-2 px-4 border">{user.user_id}</td>
                        <td className="py-2 px-4 border">{user.username}</td>
                        <td className="py-2 px-4 border">{user.email}</td>
                        <td className="py-2 px-4 border">{user.role} </td>
                        <td className="py-2 px-4 border space-x-2">
                            <button
                                onClick={() => dispatch(setEditingUser(user))}
                                className="bg-blue-500 text-white px-2 py-1 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(user.user_id)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {editingUser && (
                <EditUserModal
                    user={editingUser}
                    onClose={() => setEditingUser(null)}
                />
            )}

        </div>
    );
};

export default UsersTable;
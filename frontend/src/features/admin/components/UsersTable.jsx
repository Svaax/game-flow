import { useState } from 'react';
import { useGetAllUsersQuery, useUpdateUserRoleMutation } from '../adminAPI.js';

const UsersTable = () => {
    const { data: users, isLoading, error } = useGetAllUsersQuery();
    const [updateRole] = useUpdateUserRoleMutation();
    const [sortConfig, setSortConfig] = useState({ key: 'user_id', direction: 'asc' });

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedUsers = [...(users || [])].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const handleRoleChange = async (userId, newRole) => {
        try {
            await updateRole({ userId, role: newRole }).unwrap();
        } catch (err) {
            console.error('Failed to update role:', err);
        }
    };

    if (isLoading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-red-500 py-4">Error: {error.message}</div>;

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
                        Username {sortConfig.key === 'username' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="py-2 px-4 border">Email</th>
                    <th className="py-2 px-4 border">Role</th>
                </tr>
                </thead>
                <tbody>
                {sortedUsers.map((user) => (
                    <tr key={user.user_id}>
                        <td className="py-2 px-4 border">{user.user_id}</td>
                        <td className="py-2 px-4 border">{user.username}</td>
                        <td className="py-2 px-4 border">{user.email}</td>
                        <td className="py-2 px-4 border">
                            <select
                                value={user.role}
                                onChange={(e) => handleRoleChange(user.user_id, e.target.value)}
                                className="border rounded px-2 py-1"
                            >
                                <option value="user">User</option>
                                <option value="moderator">Moderator</option>
                                <option value="admin">Admin</option>
                            </select>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
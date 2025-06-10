import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGroups, selectAllGroups } from '../groupsSlice.js';
import { Link } from 'react-router-dom';

export default function GroupsListPage() {
    const dispatch = useDispatch();
    const { list, loading, error } = useSelector(selectAllGroups);
    console.log(list);
    useEffect(() => { dispatch(fetchGroups()); }, [dispatch]);

    if (loading) return <div>Загрузка групп...</div>;
    if (error) return <div className="text-red-500">Ошибка: {error}</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Список групп</h1>
            <ul>
                {list.map(group => (
                    <li key={group.id} className="border p-4 rounded mb-2 hover:shadow">
                        <Link to={`/groups/${group.id}`} className="text-lg font-medium">{group.name}</Link>
                        <p className="text-sm text-gray-600">{group.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
import React from 'react';
import { Link } from 'react-router-dom';

export default function CommunityPage() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Сообщество</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Link to="/community/groups" className="block p-4 border rounded-lg hover:bg-gray-100">
                    <h2 className="text-xl font-semibold">Группы</h2>
                    <p className="text-gray-600">Просматривайте и присоединяйтесь к группам по интересам.</p>
                </Link>
                <Link to="/community/forum" className="block p-4 border rounded-lg hover:bg-gray-100">
                    <h2 className="text-xl font-semibold">Форум</h2>
                    <p className="text-gray-600">Обсуждайте темы с участниками сообщества.</p>
                </Link>
                <Link to="/community/guides" className="block p-4 border rounded-lg hover:bg-gray-100">
                    <h2 className="text-xl font-semibold">Гайды</h2>
                    <p className="text-gray-600">Читайте и публикуйте полезные руководства.</p>
                </Link>
            </div>
        </div>
    );
}
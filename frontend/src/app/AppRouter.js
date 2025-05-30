import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute.jsx'
import { Roles } from '../shared/constants'

const AppRouter = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {/* Публичные маршруты */}
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="games" element={<GamesManagement />} />
                <Route path="users" element={<UsersManagement />} />
                <Route path="content" element={<ContentManagement />} />

                {/* Приватные маршруты */}
                <Route element={<PrivateRoute allowedRoles={[Roles.USER, Roles.PUBLISHER, Roles.ADMIN]} />}>
                    <Route path="/library" element={<LibraryPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                </Route>

                {/* Админские маршруты */}
                <Route element={<AdminRoute />}>
                    <Route path="/admin/games" element={<AdminGamesPage />} />
                    <Route path="/admin/community" element={<AdminCommunityPage />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    )
}
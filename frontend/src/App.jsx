import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './shared/components/Header';
import Footer from './shared/components/Footer';
import HomePage from './pages/HomePage';
import AuthPage from './features/auth/AuthPage';
import GamePage from './pages/GamePage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import CartPage from './pages/CartPage.jsx';
import LibraryPage from './pages/LibraryPage.jsx';
import CommunityPage from './pages/CommunityPage';
import ForumPage from './pages/ForumPage';
import ShopPage from "./pages/ShopPage.jsx";
import PageNotFound from './pages/PageNotFound.jsx';
import AdminDashboard from './features/admin/AdminDashboard';
import AdminRoute from './app/AdminRoute';
import LoadingSpinner from './shared/components/LoadingSpinner';
import PrivateRoute from './app/PrivateRoute';
import PostCommentsPage from "./features/community/components/PostCommentsPage.jsx";
import './App.css';
import GroupPage from './pages/GroupPage.jsx';
import GroupsPage from "./pages/GroupsPage.jsx";
import GuidesPage from './pages/GuidesPage.jsx';
import GuidePostPage from "./pages/GuidePostPage.jsx";
import WishlistPage from './pages/WishlistPage.jsx';
import ForumPost from "./features/community/components/ForumPost.jsx";

import {Roles} from './shared/constants.js'

function App() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />

            <main className="flex-grow container mx-auto px-4 py-6">
                <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                        {/* Public routes */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/shop" element={<ShopPage />} />
                        <Route path="/game/:id" element={<GamePage />} />
                        <Route path="/auth/:type" element={<AuthPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/community" element={<CommunityPage />} />
                        <Route path="/community/forum" element={<ForumPage />} />
                        <Route path="/community/forum/post/:id" element={<ForumPost />} />

                        <Route path="/community/groups" element={<GroupsPage />} />
                        <Route path="/community/guides/" element={<GuidesPage />} />
                        <Route path="/community/guides/:id" element={<GuidePostPage />} />
                        <Route path="/community/groups/:id" element={<GroupPage />} />
                        <Route path="/community/posts/:id" element={<PostCommentsPage />} />

                        {/* Private routes */}

                        <Route element={<PrivateRoute allowedRoles={[Roles.USER, Roles.DEVELOPER, Roles.PUBLISHER ,Roles.ADMIN]} />}>
                            <Route path="/cart" element={<CartPage/>} />
                            <Route path="/library" element={<LibraryPage />} />
                            <Route path="/wishlist" element={<WishlistPage/>} />
                        </Route>

                        {/* Admin routes */}
                        <Route element={<AdminRoute />}>
                            <Route path="/admin" element={<AdminDashboard />} />
                        </Route>

                        {/* 404 */}
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Suspense>
            </main>

            <Footer />
            <Toaster position="bottom-right" />
        </div>
    );
}

export default App;
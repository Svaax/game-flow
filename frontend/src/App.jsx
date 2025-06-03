import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './shared/components/Header';
import Footer from './shared/components/Footer';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage.jsx';
import Cart from './features/shop/Cart.jsx';
import LibraryPage from './pages/LibraryPage.jsx';
import CommunityPage from './pages/CommunityPage';
import ForumPage from './pages/ForumPage';
import AuthPage from './features/auth/AuthPage';
import AdminDashboard from './features/admin/AdminDashboard';
import PrivateRoute from './app/PrivateRoute';
import AdminRoute from './app/AdminRoute';
import PageNotFound from './pages/PageNotFound.jsx';
import LoadingSpinner from './shared/components/LoadingSpinner';
import './App.css';

function App() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />

            <main className="flex-grow container mx-auto px-4 py-6">
                <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                        {/* Public routes */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/game/:id" element={<GamePage />} />
                        <Route path="/community" element={<CommunityPage />} />
                        <Route path="/forum" element={<ForumPage />} />
                        <Route path="/auth/:type" element={<AuthPage />} />

                        {/* Private routes */}
                        <Route element={<PrivateRoute />}>
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/library" element={<LibraryPage />} />
                            {/*<Route path="/wishlist" element={<WishlistPage/>} />*/}
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
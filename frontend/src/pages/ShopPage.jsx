import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames, addToCart, addToWishlist, updateFilters, selectFilteredGames, selectFilters } from '../features/shop/shopSlice';
import GameCard from '../features/shop/components/GameCard';
import FilterSidebar from '../features/shop/components/FilterSidebar';
import SearchBar from '../features/shop/components/SearchBar';

const ShopPage = () => {
    const dispatch = useDispatch();
    const filteredGames = useSelector(selectFilteredGames);
    const filters = useSelector(selectFilters);
    const status = useSelector(state => state.shop.status);
    const error = useSelector(state => state.shop.error);

    useEffect(() => {
        dispatch(fetchGames(filters));
    }, [dispatch]);

    console.log(`filtered: ${JSON.stringify(filteredGames, null, 2)}`);
    const handleSearchChange = (e) => {
        dispatch(updateFilters({ searchQuery: e.target.value }));
        dispatch(fetchGames({ ...filters, searchQuery: e.target.value }));
    };

    // const handleCategoryChange = (genre) => {
    //     dispatch(updateFilters({ genre }));
    //     dispatch(fetchGames({ ...filters, genre }));
    // };

    const handlePriceChange = (e) => {
        const selected = parseInt(e.target.value);
        dispatch(updateFilters({ selectedPrice: selected }));
        dispatch(fetchGames({ ...filters, selectedPrice: selected }));
    };


    const handleAddToCart = (game) => {
        dispatch(addToCart(game));
    };

    const handleAddToWishlist = (game) => {
        dispatch(addToWishlist(game));
    };

    // Генерация категорий из данных Redux
    const categories = ['All', 'Action', 'Adventure', 'RPG', 'Strategy', 'Simulation'];

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Game Shop</h1>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar with filters */}
                    <div className="md:w-1/4">
                        <FilterSidebar
                            categories={categories}
                            priceRange={{
                                min: filters.priceRange[0],
                                max: filters.priceRange[1],
                                selected: filters.selectedPrice
                            }}

                            onPriceChange={handlePriceChange}
                        />
                    </div>


                    <div className="md:w-3/4">
                        <SearchBar searchTerm={filters.searchQuery} onSearchChange={handleSearchChange} />

                        {status === 'loading' && (
                            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                                <p className="text-gray-600">Loading games...</p>
                            </div>
                        )}

                        {status === 'failed' && (
                            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                                <p className="text-red-500">Error: {error}</p>
                            </div>
                        )}

                        {status === 'succeeded' && filteredGames.length === 0 ? (
                            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                                <p className="text-gray-600">No games match your filters. Try adjusting your search criteria.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredGames.map(game => (
                                    <GameCard
                                        key={game.game_id}
                                        game={game}
                                        onAddToCart={handleAddToCart}
                                        onAddToWishlist={handleAddToWishlist}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
import { Link } from 'react-router-dom';
// import FeaturedGames from '../features/shop/FeaturedGames';
// import PopularGuides from '../features/community/components/PopularGuides';

const HomePage = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gray-900 text-white py-16 md:py-24">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">{('home.hero.title')}</h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                        {('home.hero.subtitle')}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/shop"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium"
                        >
                            {('browseGames')}
                        </Link>
                        <Link
                            to="/community"
                            className="bg-transparent hover:bg-gray-800 text-white border border-white px-8 py-3 rounded-lg text-lg font-medium"
                        >
                            {('joinCommunity')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Games */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">{('featuredGames')}</h2>
                    {/*<FeaturedGames />*/}
                </div>
            </section>

            {/* Community Section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">{('communitySpotlight')}</h2>
                    {/*<PopularGuides />*/}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
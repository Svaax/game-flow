
const Footer = () => {

    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">GameFlow</h3>
                        <p className="text-gray-400">
                            {('footer.description')}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">{('shop')}</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white">{('games')}</a></li>
                            <li><a href="#" className="hover:text-white">{('sales')}</a></li>
                            <li><a href="#" className="hover:text-white">{('newReleases')}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">{('community')}</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white">{('forum')}</a></li>
                            <li><a href="#" className="hover:text-white">{('guides')}</a></li>
                            <li><a href="#" className="hover:text-white">{('groups')}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">{('support')}</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white">{('helpCenter')}</a></li>
                            <li><a href="#" className="hover:text-white">{('contactUs')}</a></li>
                            <li><a href="#" className="hover:text-white">{('privacyPolicy')}</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
                    <p>© {new Date().getFullYear()} GameFlow. {('footer.rights')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
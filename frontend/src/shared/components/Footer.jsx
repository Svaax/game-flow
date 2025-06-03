const Footer = () => {

    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">GameFlow</h3>
                        <p className="text-gray-400">
                            Предоставляет удобный интерфейс для покупки, управления и запуска игр,
                            а разработчикам — эффективный инструмент для публикации и монетизации своих продуктов.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Магазин</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white">Игры</a></li>
                            <li><a href="#" className="hover:text-white">Скидки</a></li>
                            <li><a href="#" className="hover:text-white">Новые релизы</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Сообщество</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white">Форум</a></li>
                            <li><a href="#" className="hover:text-white">Гайды</a></li>
                            <li><a href="#" className="hover:text-white">Группы</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
                    <p>© {new Date().getFullYear()} GameFlow. Все права защищены</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
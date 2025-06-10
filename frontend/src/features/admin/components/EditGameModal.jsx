import { useSelector, useDispatch } from 'react-redux';
import { selectEditingGame, setEditingGame, updateFormData, updateGame } from '../gamesSlice';

const EditGameModal = () => {
    const dispatch = useDispatch();
    const editingGame = useSelector(selectEditingGame);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const updatedValue = type === 'checkbox' ? checked : value;

        dispatch(updateFormData({
            [name]: updatedValue
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingGame) {
            dispatch(updateGame(editingGame));
        }
    };

    const onClose = () => {
        dispatch(setEditingGame(null));
    };

    if (!editingGame) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Edit Game</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={editingGame.title}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={editingGame.price}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            step="0.01"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Release Date</label>
                        <input
                            type="date"
                            name="release_date"
                            value={editingGame.release_date.split('T')[0]}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            name="is_active"
                            checked={editingGame.is_active}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <label className="text-gray-700">Is Active</label>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditGameModal;
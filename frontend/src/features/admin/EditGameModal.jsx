import { useState } from 'react'
import { useUpdateGameMutation } from './adminAPI.js'
import { useTranslation } from 'react-i18next'
import Modal from '../../shared/components/Modal'

const EditGameModal = ({ game, onClose }) => {
    const [formData, setFormData] = useState({
        title: game.title,
        description: game.description,
        price: game.price,
        developer: game.developer
    })
    const [updateGame] = useUpdateGameMutation()
    const { t } = useTranslation()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await updateGame({
                id: game.id,
                gameData: formData
            }).unwrap()
            onClose()
        } catch (err) {
            console.error('Failed to update game:', err)
        }
    }

    return (
        <Modal isOpen={!!game} onClose={onClose} title={t('editGame')}>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('title')}</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">{t('developer')}</label>
                        <input
                            type="text"
                            name="developer"
                            value={formData.developer}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">{t('price')}</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">{t('description')}</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            rows="4"
                            required
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                        {t('cancel')}
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        {t('saveChanges')}
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default EditGameModal
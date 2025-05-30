import { useState } from 'react'
import { useCreateCollectionMutation } from './libraryAPI.js'
import { useDispatch } from 'react-redux'
import { addCollection } from './librarySlice.js'
import { useTranslation } from 'react-i18next'
import Modal from '../../shared/components/Modal'

const CreateCollectionModal = ({ isOpen, onClose }) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [createCollection] = useCreateCollectionMutation()
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name.trim()) return

        try {
            const newCollection = await createCollection({
                name,
                description
            }).unwrap()
            dispatch(addCollection(newCollection))
            onClose()
        } catch (err) {
            console.error('Failed to create collection:', err)
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t('createCollection')}>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">{t('name')} *</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">{t('description')}</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded"
                        rows="3"
                    />
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
                        {t('create')}
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default CreateCollectionModal
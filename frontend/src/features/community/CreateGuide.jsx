import { useState } from 'react'
import { useCreateGuideMutation } from './communityAPI.js'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const CreateGuide = () => {
    const { gameId } = useParams()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [createGuide] = useCreateGuideMutation()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title.trim() || !content.trim()) return

        try {
            await createGuide({
                gameId,
                title,
                content
            }).unwrap()
            navigate(`/game/${gameId}/guides`)
        } catch (err) {
            console.error('Failed to create guide:', err)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">{('createGuide')}</h2>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">{('title')}</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">{('content')}</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-3 border rounded min-h-[300px]"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {('publishGuide')}
                </button>
            </form>
        </div>
    )
}

export default CreateGuide
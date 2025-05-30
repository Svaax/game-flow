import { useState } from 'react'
import { useAddReviewMutation } from './shopAPI'
import { useSelector } from 'react-redux'
import { selectUserRole } from '../auth/authSlice.js'
import { Roles } from '../../shared/constants.js'

const ReviewsSection = ({ gameId }) => {
    const [reviewText, setReviewText] = useState('')
    const [rating, setRating] = useState(5)
    const [addReview, { isLoading }] = useAddReviewMutation()
    const role = useSelector(selectUserRole)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!reviewText.trim()) return

        try {
            await addReview({
                gameId,
                review: { text: reviewText, rating }
            }).unwrap()
            setReviewText('')
            setRating(5)
        } catch (err) {
            console.error('Failed to add review:', err)
        }
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">{('reviews')}</h2>

            {role === Roles.USER && (
                <form onSubmit={handleSubmit} className="mb-6">
                    <div className="mb-3">
                        <label className="block mb-1">{('yourRating')}</label>
                        <select
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="border p-2 rounded"
                        >
                            {[5, 4, 3, 2, 1].map(num => (
                                <option key={num} value={num}>
                                    {num} {('stars')}
                                </option>
                            ))}
                        </select>
                    </div>

                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder={('writeReview')}
                        className="w-full p-3 border rounded mb-3"
                        rows="4"
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isLoading ? t('submitting') : t('submitReview')}
                    </button>
                </form>
            )}

            {/* Здесь будет список отзывов */}
            <div className="space-y-4">
                {/* Пример отзыва */}
                <div className="border-b pb-4">
                    <div className="flex justify-between mb-2">
                        <span className="font-semibold">Имя пользователя</span>
                        <span className="text-yellow-500">★★★★★</span>
                    </div>
                    <p>Отличная игра, рекомендую!</p>
                </div>
            </div>
        </div>
    )
}

export default ReviewsSection
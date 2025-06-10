import { useGetGuidesQuery } from '../communityAPI.js'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../../../shared/components/LoadingSpinner.jsx'
import GuideCard from './GuideCard'

const GuidesList = () => {
    const { gameId } = useParams()
    const { data: guides, isLoading } = useGetGuidesQuery(gameId)

    if (isLoading) return <LoadingSpinner />

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">{('gameGuides')}</h2>

            {guides.length === 0 ? (
                <p className="text-gray-600">{('noGuidesYet')}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {guides.map(guide => (
                        <GuideCard key={guide.id} guide={guide} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default GuidesList
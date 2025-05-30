import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateFilters } from './shopSlice.js'
import { selectFilters } from './shopSlice.js'
import { useTranslation } from 'react-i18next'

const Filters = () => {
    const dispatch = useDispatch()
    const filters = useSelector(selectFilters)
    const [search, setSearch] = useState(filters.searchQuery)
    const { t } = useTranslation()

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
        dispatch(updateFilters({ searchQuery: e.target.value }))
    }

    return (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        {t('search')}
                    </label>
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        className="w-full p-2 border rounded"
                        placeholder={t('searchPlaceholder')}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        {t('priceRange')}
                    </label>
                    <div className="flex items-center space-x-2">
                        <span>${filters.priceRange[0]}</span>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={filters.priceRange[1]}
                            onChange={(e) => dispatch(updateFilters({
                                priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                            }))}
                            className="flex-1"
                        />
                        <span>${filters.priceRange[1]}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filters
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllGames, fetchAllUsers } from './adminSlice'
import { selectAdminStats, selectAdminStatus } from './adminSlice'
// import StatsCard from '../components/StatsCard'
import LoadingSpinner from '../../shared/components/LoadingSpinner'
import { Tab } from '@headlessui/react'
// import GamesTable from './components/GamesTable'
// import UsersTable from './components/UsersTable'

const AdminDashboard = () => {
    const dispatch = useDispatch()
    const stats = useSelector(selectAdminStats)
    const status = useSelector(selectAdminStatus)
    
    useEffect(() => {
        dispatch(fetchAllGames())
        dispatch(fetchAllUsers())
    }, [dispatch])

    if (status === 'loading') return <LoadingSpinner />

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">{('adminPanel')}</h1>

            {/* Статистика */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/*<StatsCard*/}
                {/*    title={('totalGames')}*/}
                {/*    value={stats.totalGames}*/}
                {/*    icon="🎮"*/}
                {/*/>*/}
                {/*<StatsCard*/}
                {/*    title={('totalUsers')}*/}
                {/*    value={stats.totalUsers}*/}
                {/*    icon="👥"*/}
                {/*/>*/}
                {/*<StatsCard*/}
                {/*    title={('activeUsers')}*/}
                {/*    value={stats.activeUsers}*/}
                {/*    icon="🟢"*/}
                {/*/>*/}
            </div>

            {/* Табы управления */}
            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-lg bg-gray-200 p-1 mb-6">
                    <Tab className={({ selected }) =>
                        `w-full py-2 rounded-md text-sm font-medium ${
                            selected ? 'bg-white shadow text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                        }`
                    }>
                        {('gamesManagement')}
                    </Tab>
                    <Tab className={({ selected }) =>
                        `w-full py-2 rounded-md text-sm font-medium ${
                            selected ? 'bg-white shadow text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                        }`
                    }>
                        {('usersManagement')}
                    </Tab>
                </Tab.List>

                <Tab.Panels>
                    <Tab.Panel>
                        {/*<GamesTable />*/}
                    </Tab.Panel>
                    <Tab.Panel>
                        {/*<UsersTable />*/}
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

export default AdminDashboard
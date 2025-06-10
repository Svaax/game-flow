import { useSelector } from 'react-redux'
import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { selectUserRole } from '../features/auth/authSlice'
import { Roles } from '../shared/constants'
import LoadingSpinner from '../shared/components/LoadingSpinner'

const AdminRoute = ({ children }) => {
    const role = useSelector(selectUserRole)
    console.log(role === Roles.ADMIN)
    const location = useLocation()

    if (role === null) {

        return <LoadingSpinner />
    }

    if (role !== Roles.ADMIN) {
        return <Navigate to="/" state={{ from: location }} replace />
    }

    return <Outlet />
}

export default AdminRoute
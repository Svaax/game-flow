import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { selectUserRole } from '../features/auth/authSlice'
import { Roles } from '../shared/constants'
import LoadingSpinner from '../shared/components/LoadingSpinner'

const AdminRoute = ({ children }) => {
    // const role = useSelector(selectUserRole)
    // const location = useLocation()

    if (role === null) {
        // Еще не загрузились данные пользователя
        return <LoadingSpinner />
    }

    // if (role !== Roles.ADMIN) {
        return <Navigate to="/" state={{ from: location }} replace />
    // }

    return children
}

export default AdminRoute
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { selectUserRole } from '../features/auth/authSlice'
import { Roles } from '../shared/constants'

const PrivateRoute = ({ children, allowedRoles = [Roles.USER] }) => {
    const role = useSelector(selectUserRole)
    const location = useLocation()

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children
}

export default PrivateRoute
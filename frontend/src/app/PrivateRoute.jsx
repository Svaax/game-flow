import { useSelector } from 'react-redux'
import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { selectUserRole } from '../features/auth/authSlice'
import { Roles } from '../shared/constants'

const PrivateRoute = ({ children, allowedRoles = [Roles.USER] }) => {
    const role = useSelector(selectUserRole)

    console.log(`allowed: ${allowedRoles} user: ${role}`)
    const location = useLocation()

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return <Outlet />
}

export default PrivateRoute
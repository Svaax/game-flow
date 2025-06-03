import { createSlice } from '@reduxjs/toolkit'
import { Roles } from '../../shared/constants.js'

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    status: 'idle',
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload
            state.user = user
            state.token = token

            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', token)
        },
        logout: (state) => {
            state.user = null
            state.token = null

            localStorage.removeItem('user')
            localStorage.removeItem('token')
        }
    }
})

export const { setCredentials, logout } = authSlice.actions

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
export const selectUserRole = (state) =>
    state.auth.user?.role || Roles.GUEST

export default authSlice.reducer
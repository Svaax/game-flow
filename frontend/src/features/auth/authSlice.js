import { createSlice } from '@reduxjs/toolkit'
import { Roles } from '../../shared/constants.js'

const initialState = {
    user: null,
    token: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
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
        },
        logout: (state) => {
            state.user = null
            state.token = null
        }
    }
})

export const { setCredentials, logout } = authSlice.actions

// Селекторы
export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
export const selectUserRole = (state) =>
    state.auth.user?.role || Roles.GUEST

export default authSlice.reducer
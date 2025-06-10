import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { Roles } from '../../shared/constants.js'
import {API_BASE_URL} from "../../config.js";
import {fetchForumPosts} from "../community/forumSlice.js";

export const fetchUsers = createAsyncThunk(
    'auth/fetchUsers',
    async (_, {rejectWithValue}) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/users`)
            const data = await response.json()
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)
const initialState = {
    users: [],
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
    }, extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.users = action.payload
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload?.message
            })
    }
})

export const { setCredentials, logout } = authSlice.actions

export const selectAllUsers = (state) => state.auth.users
export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
export const selectUserRole = (state) =>
    state.auth.user?.role || Roles.GUEST

export default authSlice.reducer
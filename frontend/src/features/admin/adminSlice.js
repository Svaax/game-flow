import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { adminAPI } from './adminAPI.js'

export const fetchAllGames = createAsyncThunk(
    'admin/fetchAllGames',
    async (_, { rejectWithValue }) => {
        try {
            return await adminAPI.getAllGames()
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const fetchAllUsers = createAsyncThunk(
    'admin/fetchAllUsers',
    async (_, { rejectWithValue }) => {
        try {
            return await adminAPI.getAllUsers()
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

const initialState = {
    games: [],
    users: [],
    status: 'idle',
    error: null,
    stats: {
        totalGames: 0,
        totalUsers: 0,
        activeUsers: 0
    }
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        updateGame: (state, action) => {
            const index = state.games.findIndex(g => g.id === action.payload.id)
            if (index !== -1) {
                state.games[index] = action.payload
            }
        },
        deleteGame: (state, action) => {
            state.games = state.games.filter(g => g.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllGames.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchAllGames.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.games = action.payload.games
                state.stats.totalGames = action.payload.total
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.users = action.payload.users
                state.stats.totalUsers = action.payload.total
                state.stats.activeUsers = action.payload.active
            })
    }
})

export const { updateGame, deleteGame } = adminSlice.actions

export const selectAdminGames = (state) => state.admin.games
export const selectAdminUsers = (state) => state.admin.users
export const selectAdminStats = (state) => state.admin.stats
export const selectAdminStatus = (state) => state.admin.status

export default adminSlice.reducer

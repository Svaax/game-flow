import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { libraryAPI } from './libraryAPI.js'

export const fetchUserGames = createAsyncThunk(
    'library/fetchUserGames',
    async (_, { rejectWithValue }) => {
        try {
            return await libraryAPI.getUserGames()
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const fetchCollections = createAsyncThunk(
    'library/fetchCollections',
    async (_, { rejectWithValue }) => {
        try {
            return await libraryAPI.getCollections()
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

const initialState = {
    games: [],
    collections: [],
    status: 'idle',
    error: null,
    selectedGame: null,
    installationProgress: {}
}

const librarySlice = createSlice({
    name: 'library',
    initialState,
    reducers: {
        setSelectedGame: (state, action) => {
            state.selectedGame = action.payload
        },
        updateInstallationProgress: (state, action) => {
            const { gameId, progress } = action.payload
            state.installationProgress[gameId] = progress
        },
        addCollection: (state, action) => {
            state.collections.push(action.payload)
        },
        updateGameProgress: (state, action) => {
            const { gameId, progress } = action.payload
            const game = state.games.find(g => g.id === gameId)
            if (game) {
                game.userProgress = progress
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserGames.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchUserGames.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.games = action.payload
            })
            .addCase(fetchUserGames.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload.message
            })
            .addCase(fetchCollections.fulfilled, (state, action) => {
                state.collections = action.payload
            })
    }
})

export const {
    setSelectedGame,
    updateInstallationProgress,
    addCollection,
    updateGameProgress
} = librarySlice.actions

export default librarySlice.reducer

// Селекторы
export const selectUserGames = (state) => state.library.games
export const selectCollections = (state) => state.library.collections
export const selectLibraryStatus = (state) => state.library.status
export const selectSelectedGame = (state) => state.library.selectedGame
export const selectInstallationProgress = (state) => state.library.installationProgress
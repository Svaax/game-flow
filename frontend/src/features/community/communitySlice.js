import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { communityAPI } from './communityAPI.js'

export const fetchForumPosts = createAsyncThunk(
    'community/fetchForumPosts',
    async (params, { rejectWithValue }) => {
        try {
            return await communityAPI.getForumPosts(params)
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const fetchGuides = createAsyncThunk(
    'community/fetchGuides',
    async (gameId, { rejectWithValue }) => {
        try {
            return await communityAPI.getGuides(gameId)
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

const initialState = {
    forumPosts: [],
    guides: [],
    groups: [],
    status: 'idle',
    error: null,
    currentForumPage: 1,
    forumTotalPages: 1
}

const communitySlice = createSlice({
    name: 'community',
    initialState,
    reducers: {
        addForumPost: (state, action) => {
            state.forumPosts.unshift(action.payload)
        },
        addGuide: (state, action) => {
            state.guides.unshift(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchForumPosts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchForumPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.forumPosts = action.payload.posts
                state.forumTotalPages = action.payload.totalPages
            })
            .addCase(fetchForumPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload.message
            })
            .addCase(fetchGuides.fulfilled, (state, action) => {
                state.guides = action.payload
            })
    }
})

export const { addForumPost, addGuide } = communitySlice.actions

// Селекторы
export const selectForumPosts = (state) => state.community.forumPosts
export const selectGuides = (state) => state.community.guides
export const selectCommunityStatus = (state) => state.community.status


export default communitySlice.reducer

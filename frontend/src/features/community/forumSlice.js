import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_BASE_URL } from '../../config.js'

// Async thunks
export const fetchForumPosts = createAsyncThunk(
    'forum/fetchForumPosts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/forum`)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            return data
        } catch (err) {
            return rejectWithValue(err.message || 'Failed to fetch forum posts')
        }
    }
)

export const createForumPost = createAsyncThunk(
    'forum/createForumPost',
    async (post, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/forum`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            return data
        } catch (err) {
            return rejectWithValue(err.message || 'Failed to create forum post')
        }
    }
)

export const deleteForumPost = createAsyncThunk(
    'forum/deleteForumPost',
    async (postId, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/forum/${postId}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            return postId
        } catch (err) {
            return rejectWithValue(err.message || 'Failed to delete forum post')
        }
    }
)

export const updateForumPost = createAsyncThunk(
    'forum/updateForumPost',
    async ({ postId, updates }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/forum/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            return data
        } catch (err) {
            return rejectWithValue(err.message || 'Failed to update forum post')
        }
    }
)

const forumSlice = createSlice({
    name: 'forum',
    initialState: {
        posts: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
        sortConfig: {
            field: 'created_at',
            direction: 'desc'
        }
    },
    reducers: {
        setSortConfig: (state, action) => {
            state.sortConfig = action.payload
        },
        clearError: (state) => {
            state.error = null
        },
        resetForumState: (state) => {
            state.posts = []
            state.status = 'idle'
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch forum posts
            .addCase(fetchForumPosts.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchForumPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.posts = Array.isArray(action.payload) ? action.payload : []
                state.error = null
            })
            .addCase(fetchForumPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })

            // Create forum post
            .addCase(createForumPost.pending, (state) => {
                state.error = null
            })
            .addCase(createForumPost.fulfilled, (state, action) => {
                if (Array.isArray(state.posts)) {
                    // Add new post to the beginning of the array
                    state.posts.unshift(action.payload)
                } else {
                    state.posts = [action.payload]
                }
                state.error = null
            })
            .addCase(createForumPost.rejected, (state, action) => {
                state.error = action.payload
            })

            // Delete forum post
            .addCase(deleteForumPost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => post.id !== action.payload)
                state.error = null
            })
            .addCase(deleteForumPost.rejected, (state, action) => {
                state.error = action.payload
            })

            // Update forum post
            .addCase(updateForumPost.fulfilled, (state, action) => {
                const index = state.posts.findIndex(post => post.id === action.payload.id)
                if (index !== -1) {
                    state.posts[index] = action.payload
                }
                state.error = null
            })
            .addCase(updateForumPost.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})

// Actions
export const { setSortConfig, clearError, resetForumState } = forumSlice.actions

// Selectors
export const selectForumPosts = (state) => state.forum.posts
export const selectForumStatus = (state) => state.forum.status
export const selectForumError = (state) => state.forum.error
export const selectSortConfig = (state) => state.forum.sortConfig

// Memoized selectors
export const selectSortedForumPosts = (state) => {
    const posts = selectForumPosts(state)
    const sortConfig = selectSortConfig(state)

    if (!Array.isArray(posts) || posts.length === 0) return []

    return [...posts].sort((a, b) => {
        const aValue = a[sortConfig.field]
        const bValue = b[sortConfig.field]

        if (sortConfig.direction === 'asc') {
            return aValue > bValue ? 1 : -1
        } else {
            return aValue < bValue ? 1 : -1
        }
    })
}

export const selectForumPostById = (state, postId) => {
    return state.forum.posts.find(post => post.id === postId)
}

export default forumSlice.reducer
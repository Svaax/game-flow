import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_BASE_URL } from '../../config.js'

// Async thunks
export const fetchGuides = createAsyncThunk(
    'guides/fetchGuides',
    async (params = {}, { rejectWithValue }) => {
        try {
            const queryParams = new URLSearchParams()

            if (params.gameId) queryParams.append('gameId', params.gameId)
            if (params.userId) queryParams.append('userId', params.userId)
            if (params.search) queryParams.append('search', params.search)
            if (params.tags) queryParams.append('tags', params.tags.join(','))
            if (params.limit) queryParams.append('limit', params.limit)
            if (params.offset) queryParams.append('offset', params.offset)

            const url = `${API_BASE_URL}/api/guides${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
            const response = await fetch(url)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            return data
        } catch (err) {
            return rejectWithValue(err.message || 'Failed to fetch guides')
        }
    }
)

export const fetchGuideById = createAsyncThunk(
    'guides/fetchGuideById',
    async (guideId, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/guides/${guideId}`)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            return data
        } catch (err) {
            return rejectWithValue(err.message || 'Failed to fetch guide')
        }
    }
)

export const createGuide = createAsyncThunk(
    'guides/createGuide',
    async (guide, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/guides`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(guide),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            return data
        } catch (err) {
            return rejectWithValue(err.message || 'Failed to create guide')
        }
    }
)

export const updateGuide = createAsyncThunk(
    'guides/updateGuide',
    async ({ guideId, updates }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/guides/${guideId}`, {
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
            return rejectWithValue(err.message || 'Failed to update guide')
        }
    }
)

export const deleteGuide = createAsyncThunk(
    'guides/deleteGuide',
    async (guideId, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/guides/${guideId}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            return guideId
        } catch (err) {
            return rejectWithValue(err.message || 'Failed to delete guide')
        }
    }
)

export const fetchGuideComments = createAsyncThunk(
    'guides/fetchGuideComments',
    async (guideId, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/guides/${guideId}/comments`)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            return { guideId, comments: data }
        } catch (err) {
            return rejectWithValue(err.message || 'Failed to fetch guide comments')
        }
    }
)

export const addGuideComment = createAsyncThunk(
    'guides/addGuideComment',
    async ({ guideId, comment }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/guides/${guideId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comment),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            return { guideId, comment: data }
        } catch (err) {
            return rejectWithValue(err.message || 'Failed to add comment')
        }
    }
)

export const likeGuide = createAsyncThunk(
    'guides/likeGuide',
    async ({ guideId, userId }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/guides/${guideId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            return { guideId, ...data }
        } catch (err) {
            return rejectWithValue(err.message || 'Failed to like guide')
        }
    }
)

export const rateGuide = createAsyncThunk(
    'guides/rateGuide',
    async ({ guideId, userId, rating }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/guides/${guideId}/rate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, rating }),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            return { guideId, ...data }
        } catch (err) {
            return rejectWithValue(err.message || 'Failed to rate guide')
        }
    }
)

// Slice
const guidesSlice = createSlice({
    name: 'guides',
    initialState: {
        list: [],
        currentGuide: null,
        comments: {}, // guideId -> comments array
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
        pagination: {
            total: 0,
            page: 1,
            limit: 20,
            hasMore: true
        },
        filters: {
            gameId: null,
            userId: null,
            search: '',
            tags: []
        },
        // Loading states for specific operations
        loadingStates: {
            creating: false,
            updating: false,
            deleting: false,
            liking: false,
            rating: false,
            commenting: false
        }
    },
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload }
        },
        clearFilters: (state) => {
            state.filters = {
                gameId: null,
                userId: null,
                search: '',
                tags: []
            }
        },
        resetGuidesState: (state) => {
            state.list = []
            state.currentGuide = null
            state.comments = {}
            state.status = 'idle'
            state.error = null
            state.pagination = {
                total: 0,
                page: 1,
                limit: 20,
                hasMore: true
            }
        },
        updateGuideInList: (state, action) => {
            const index = state.list.findIndex(guide => guide.id === action.payload.id)
            if (index !== -1) {
                state.list[index] = { ...state.list[index], ...action.payload }
            }
        },
        clearCurrentGuide: (state) => {
            state.currentGuide = null
        },
        setPagination: (state, action) => {
            state.pagination = { ...state.pagination, ...action.payload }
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch guides
            .addCase(fetchGuides.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchGuides.fulfilled, (state, action) => {
                state.status = 'succeeded'

                if (Array.isArray(action.payload)) {
                    state.list = action.payload
                } else if (action.payload.guides) {
                    state.list = action.payload.guides
                    state.pagination = {
                        total: action.payload.total || action.payload.guides.length,
                        page: action.payload.page || 1,
                        limit: action.payload.limit || 20,
                        hasMore: action.payload.hasMore ?? true
                    }
                }

                state.error = null
            })
            .addCase(fetchGuides.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })

            // Fetch guide by ID
            .addCase(fetchGuideById.pending, (state) => {
                state.error = null
            })
            .addCase(fetchGuideById.fulfilled, (state, action) => {
                state.currentGuide = action.payload
                state.error = null
            })
            .addCase(fetchGuideById.rejected, (state, action) => {
                state.error = action.payload
            })

            // Create guide
            .addCase(createGuide.pending, (state) => {
                state.loadingStates.creating = true
                state.error = null
            })
            .addCase(createGuide.fulfilled, (state, action) => {
                state.loadingStates.creating = false
                if (Array.isArray(state.list)) {
                    state.list.unshift(action.payload)
                } else {
                    state.list = [action.payload]
                }
                state.error = null
            })
            .addCase(createGuide.rejected, (state, action) => {
                state.loadingStates.creating = false
                state.error = action.payload
            })

            // Update guide
            .addCase(updateGuide.pending, (state) => {
                state.loadingStates.updating = true
                state.error = null
            })
            .addCase(updateGuide.fulfilled, (state, action) => {
                state.loadingStates.updating = false
                const index = state.list.findIndex(guide => guide.id === action.payload.id)
                if (index !== -1) {
                    state.list[index] = action.payload
                }
                if (state.currentGuide && state.currentGuide.id === action.payload.id) {
                    state.currentGuide = action.payload
                }
                state.error = null
            })
            .addCase(updateGuide.rejected, (state, action) => {
                state.loadingStates.updating = false
                state.error = action.payload
            })

            // Delete guide
            .addCase(deleteGuide.pending, (state) => {
                state.loadingStates.deleting = true
                state.error = null
            })
            .addCase(deleteGuide.fulfilled, (state, action) => {
                state.loadingStates.deleting = false
                state.list = state.list.filter(guide => guide.id !== action.payload)
                if (state.currentGuide && state.currentGuide.id === action.payload) {
                    state.currentGuide = null
                }
                state.error = null
            })
            .addCase(deleteGuide.rejected, (state, action) => {
                state.loadingStates.deleting = false
                state.error = action.payload
            })

            // Fetch guide comments
            .addCase(fetchGuideComments.fulfilled, (state, action) => {
                state.comments[action.payload.guideId] = action.payload.comments
            })

            // Add guide comment
            .addCase(addGuideComment.pending, (state) => {
                state.loadingStates.commenting = true
            })
            .addCase(addGuideComment.fulfilled, (state, action) => {
                state.loadingStates.commenting = false
                const { guideId, comment } = action.payload
                if (!state.comments[guideId]) {
                    state.comments[guideId] = []
                }
                state.comments[guideId].push(comment)
            })
            .addCase(addGuideComment.rejected, (state, action) => {
                state.loadingStates.commenting = false
                state.error = action.payload
            })

            // Like guide
            .addCase(likeGuide.pending, (state) => {
                state.loadingStates.liking = true
            })
            .addCase(likeGuide.fulfilled, (state, action) => {
                state.loadingStates.liking = false
                const { guideId, likes, isLiked } = action.payload
                const guide = state.list.find(g => g.id === guideId)
                if (guide) {
                    guide.likes = likes
                    guide.isLiked = isLiked
                }
                if (state.currentGuide && state.currentGuide.id === guideId) {
                    state.currentGuide.likes = likes
                    state.currentGuide.isLiked = isLiked
                }
            })
            .addCase(likeGuide.rejected, (state, action) => {
                state.loadingStates.liking = false
                state.error = action.payload
            })

            // Rate guide
            .addCase(rateGuide.pending, (state) => {
                state.loadingStates.rating = true
            })
            .addCase(rateGuide.fulfilled, (state, action) => {
                state.loadingStates.rating = false
                const { guideId, rating, averageRating, ratingsCount } = action.payload
                const guide = state.list.find(g => g.id === guideId)
                if (guide) {
                    guide.userRating = rating
                    guide.averageRating = averageRating
                    guide.ratingsCount = ratingsCount
                }
                if (state.currentGuide && state.currentGuide.id === guideId) {
                    state.currentGuide.userRating = rating
                    state.currentGuide.averageRating = averageRating
                    state.currentGuide.ratingsCount = ratingsCount
                }
            })
            .addCase(rateGuide.rejected, (state, action) => {
                state.loadingStates.rating = false
                state.error = action.payload
            })
    }
})

// Actions
export const {
    clearError,
    setFilters,
    clearFilters,
    resetGuidesState,
    updateGuideInList,
    clearCurrentGuide,
    setPagination
} = guidesSlice.actions

// Basic Selectors
export const selectAllGuides = (state) => state.guides.list
export const selectCurrentGuide = (state) => state.guides.currentGuide
export const selectGuidesStatus = (state) => state.guides.status
export const selectGuidesError = (state) => state.guides.error
export const selectGuidesPagination = (state) => state.guides.pagination
export const selectGuidesFilters = (state) => state.guides.filters
export const selectGuidesLoadingStates = (state) => state.guides.loadingStates

// Specific selectors
export const selectGuideComments = (state, guideId) => state.guides.comments[guideId] || []

export const selectGuideById = (state, guideId) => {
    return state.guides.list.find(guide => guide.id === guideId || guide.guide_id === guideId)
}

export const selectGuidesByGame = (state, gameId) => {
    return state.guides.list.filter(guide => guide.game_id === gameId || guide.gameId === gameId)
}

export const selectGuidesByUser = (state, userId) => {
    return state.guides.list.filter(guide => guide.user_id === userId || guide.userId === userId)
}

// Complex selectors
export const selectFilteredGuides = (state) => {
    const guides = selectAllGuides(state)
    const filters = selectGuidesFilters(state)

    return guides.filter(guide => {
        if (filters.gameId && (guide.game_id !== filters.gameId && guide.gameId !== filters.gameId)) {
            return false
        }
        if (filters.userId && (guide.user_id !== filters.userId && guide.userId !== filters.userId)) {
            return false
        }
        if (filters.search) {
            const searchLower = filters.search.toLowerCase()
            const titleMatch = guide.title?.toLowerCase().includes(searchLower)
            const contentMatch = guide.content?.toLowerCase().includes(searchLower)
            if (!titleMatch && !contentMatch) return false
        }
        if (filters.tags && filters.tags.length > 0) {
            const guideTags = guide.tags || []
            const hasMatchingTag = filters.tags.some(tag => guideTags.includes(tag))
            if (!hasMatchingTag) return false
        }
        return true
    })
}

export const selectPopularGuides = (state) => {
    const guides = selectAllGuides(state)
    return [...guides].sort((a, b) => (b.likes || 0) - (a.likes || 0))
}

export const selectRecentGuides = (state) => {
    const guides = selectAllGuides(state)
    return [...guides].sort((a, b) => new Date(b.created_at || b.createdAt) - new Date(a.created_at || a.createdAt))
}

export const selectTopRatedGuides = (state) => {
    const guides = selectAllGuides(state)
    return [...guides]
        .filter(guide => (guide.ratingsCount || 0) > 0)
        .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
}

// Loading state selectors
export const selectIsCreatingGuide = (state) => state.guides.loadingStates.creating
export const selectIsUpdatingGuide = (state) => state.guides.loadingStates.updating
export const selectIsDeletingGuide = (state) => state.guides.loadingStates.deleting
export const selectIsLikingGuide = (state) => state.guides.loadingStates.liking
export const selectIsRatingGuide = (state) => state.guides.loadingStates.rating
export const selectIsCommentingGuide = (state) => state.guides.loadingStates.commenting

export default guidesSlice.reducer
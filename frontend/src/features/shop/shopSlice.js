import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_BASE_URL } from '../../config.js'

// Async thunk для загрузки игр
export const fetchGames = createAsyncThunk(
    'shop/fetchGames',
    async (filters, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/games?`)
            const data = await response.json()
            return data
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

const initialState = {
    games: [],
    cart: [],        // [{ game, quantity }, ...]
    wishlist: [],    // [ game, ... ]
    filters: {
        searchQuery: '',
        selectedPrice: null,
        priceRange: [0, 100]
    },
    status: 'idle',
    error: null
}

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        updateFilters(state, action) {
            state.filters = { ...state.filters, ...action.payload }
        },
        addToCart(state, action) {
            const game = action.payload
            const existing = state.cart.find(item => item.game.game_id === game.game_id)
            if (existing) {
                existing.quantity += 1
            } else {
                state.cart.push({ game, quantity: 1 })
            }
        },
        removeFromCart(state, action) {
            const gameId = action.payload
            state.cart = state.cart.filter(item => item.game.game_id !== gameId)
        },
        addToWishlist(state, action) {
            const game = action.payload
            if (!state.wishlist.some(g => g.game_id === game.game_id)) {
                state.wishlist.push(game)
            }
        },
        removeFromWishlist(state, action) {
            const gameId = action.payload
            state.wishlist = state.wishlist.filter(g => g.game_id !== gameId)
        },
        clearCart(state) {
            state.cart = []
        },
        clearWishlist(state) {
            state.wishlist = []
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchGames.pending, state => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.games = action.payload
            })
            .addCase(fetchGames.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload || action.error.message
            })
    }
})

export const {
    updateFilters,
    addToCart,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
    clearCart,
    clearWishlist
} = shopSlice.actions

// Селекторы
export const selectAllGames      = state => state.shop.games
export const selectFilters       = state => state.shop.filters
export const selectShopStatus    = state => state.shop.status
export const selectShopError     = state => state.shop.error
export const selectCartItems     = state => state.shop.cart
export const selectWishlistItems = state => state.shop.wishlist

export const selectFilteredGames = state => {
    const { games, filters } = state.shop
    return games
        .filter(g => !filters.searchQuery || g.title.toLowerCase().includes(filters.searchQuery.toLowerCase()))
        .filter(g => !filters.selectedPrice || g.price <= filters.selectedPrice)
}

export default shopSlice.reducer

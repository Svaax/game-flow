import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { shopAPI } from './shopAPI.js'

// Асинхронные thunks
export const fetchGames = createAsyncThunk(
    'shop/fetchGames',
    async (params, { rejectWithValue }) => {
        try {
            return await shopAPI.getGames(params)
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

const initialState = {
    games: [],
    cart: [],
    wishlist: [],
    status: 'idle',
    error: null,
    filters: {
        genre: '',
        priceRange: [0, 100],
        searchQuery: ''
    }
}

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const game = action.payload
            const existingItem = state.cart.find(item => item.id === game.id)
            if (!existingItem) {
                state.cart.push({...game, quantity: 1})
            }
        },
        addToWishlist: (state, action) => {
            const game = action.payload
            if (!state.wishlist.some(item => item.id === game.id)) {
                state.wishlist.push(game)
            }
        },
        updateFilters: (state, action) => {
            state.filters = {...state.filters, ...action.payload}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGames.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.games = action.payload
            })
            .addCase(fetchGames.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload.message
            })
    }
})

export const { addToCart, addToWishlist, updateFilters } = shopSlice.actions
export default shopSlice.reducer

// Селекторы
export const selectAllGames = (state) => state.shop.games
export const selectCartItems = (state) => state.shop.cart
export const selectWishlist = (state) => state.shop.wishlist
export const selectFilters = (state) => state.shop.filters
export const selectFilteredGames = (state) => {
    const { games, filters } = state.shop
    return games.filter(game => {
        const matchesGenre = !filters.genre || game.genres.includes(filters.genre)
        const matchesPrice = game.price >= filters.priceRange[0] &&
            game.price <= filters.priceRange[1]
        const matchesSearch = game.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
        return matchesGenre && matchesPrice && matchesSearch
    })
}
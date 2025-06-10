import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../../config.js';

export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/wishlists?userId=${userId}`);
        if (!response.ok) throw new Error('Failed to fetch wishlist');
        const data = await response.json();
        return data[0];
    } catch (error) {
        throw new Error(error.message);
    }
});

export const fetchWishlistGames = createAsyncThunk('wishlist/fetchWishlistGames', async (wishlistId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/wishlist-games?wishlistId=${wishlistId}`);
        if (!response.ok) throw new Error('Failed to fetch wishlist games');
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
});

export const addToWishlist = createAsyncThunk('wishlist/addToWishlist', async ({ wishlistId, gameId }) => {
    try {
        const response = await fetch(`${API_BASE_URL}/wishlist-games`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ wishlistId, gameId })
        });

        if (!response.ok) throw new Error('Failed to add game to wishlist');
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
});

export const removeFromWishlist = createAsyncThunk('wishlist/removeFromWishlist', async (wishlistGameId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/wishlist-games/${wishlistGameId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to remove game from wishlist');
        return wishlistGameId;
    } catch (error) {
        throw new Error(error.message);
    }
});

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        wishlist: null,
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.wishlist = action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchWishlistGames.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            });
    }
});

export default wishlistSlice.reducer;
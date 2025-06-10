import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../../config.js';

export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/carts?userId=${userId}`);
        if (!response.ok) throw new Error('Failed to fetch cart');
        const data = await response.json();
        return data[0]; // Предполагаем, что у пользователя одна корзина
    } catch (error) {
        throw new Error(error.message);
    }
});

export const addToCart = createAsyncThunk('cart/addToCart', async ({ cartId, gameId }) => {
    try {
        const response = await fetch(`${API_BASE_URL}/cart-games`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cartId, gameId })
        });

        if (!response.ok) throw new Error('Failed to add game to cart');
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (cartGameId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/cart-games/${cartGameId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to remove game from cart');
        return cartGameId;
    } catch (error) {
        throw new Error(error.message);
    }
});

export const fetchCartGames = createAsyncThunk('cart/fetchCartGames', async (cartId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/cart-games?cartId=${cartId}`);
        if (!response.ok) throw new Error('Failed to fetch cart games');
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: null,
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cart = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchCartGames.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            });
    }
});

export default cartSlice.reducer;
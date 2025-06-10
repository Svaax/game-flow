import { configureStore } from '@reduxjs/toolkit'

import {apiSlice} from '../shared/api/apiSlice.js'
import authReducer from '../features/auth/authSlice.js'
import shopReducer from '../features/shop/shopSlice.js'
import cartReducer from '../features/shop/cartSlice.js'
import wishlistReducer from '../features/shop/wishlistSlice.js'
import groupsReducer from '../features/community/groupsSlice.js'
import forumReducer from '../features/community/forumSlice.js'
import guidesReducer from '../features/community/guidesSlice.js'
import gamesReducer from '../features/admin/gamesSlice.js'
import usersReducer from '../features/admin/usersSlice.js'
import libraryReducer from '../features/library/librarySlice.js'


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        shop: shopReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        // community reducers
        groups: groupsReducer,
        forum: forumReducer,
        guides: guidesReducer,
        library: libraryReducer,
        // admin reducers
        games: gamesReducer,
        users: usersReducer

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})
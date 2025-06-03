import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import {apiSlice} from '../shared/api/apiSlice.js'
import authReducer from '../features/auth/authSlice.js'
import shopReducer from '../features/shop/shopSlice.js'
import adminReducer from '../features/admin/adminSlice.js'
import communityReducer from '../features/community/communitySlice.js'
import libraryReducer from '../features/library/librarySlice.js'


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        shop: shopReducer,
        community: communityReducer,
        admin: adminReducer,
        library: libraryReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})
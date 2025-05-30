import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import authReducer from '../features/auth/authSlice.js'
import shopReducer from '../features/shop/shopSlice.js'


const rootReducer = combineReducers({
    auth: authReducer,
    shop: shopReducer,
    // ... другие редьюсеры
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
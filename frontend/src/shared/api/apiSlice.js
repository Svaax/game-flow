import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Game', 'Review', 'ForumPost'],
    endpoints: () => ({})
})
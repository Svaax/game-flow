import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl="http://localhost:5000/api"


const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const tagTypes = [
    'CartGame',
    'Cart',
    'Developer',
    'ForumComment',
    'ForumPost',
    'GameAchievement',
    'Game',
    'GameTag',
    'GroupComment',
    'GroupMember',
    'GroupPost',
    'Group',
    'GuideComment',
    'Guide',
    'LibraryGame',
    'Publisher',
    'Review',
    'Tag',
    'UserAchievement',
    'User',
    'WishlistGame',
    'Wishlist'
];

export const apiSlice = createApi({
    baseQuery,
    tagTypes,
    endpoints: () => ({})
})
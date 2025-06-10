import { apiSlice } from '../../shared/api/apiSlice.js'

export const adminAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Games endpoints
        getAllGames: builder.query({
            query: () => '/games',
            providesTags: ['Game']
        }),
        updateGame: builder.mutation({
            // data that can be updated: title, description, price, release_date, cover_image, is_active
            query: ({ id, gameData }) => ({
                url: `/games/${id}`,
                method: 'PUT',
                body: gameData
            }),
            invalidatesTags: ['Game']
        }),
        deleteGame: builder.mutation({
            query: (id) => ({
                url: `/games/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Game']
        }),
        // User endpoints
        getAllUsers: builder.query({
            query: () => '/users',
            providesTags: ['User']
        }),
        updateUser: builder.mutation({
            query: ({ userId, userData }) => ({
                url: `/users/${userId}`,
                method: 'PUT',
                body: userData
            }),
            invalidatesTags: ['User']
        }),
        deleteUser: builder.mutation({
            query: (userId) => `/users/${userId}`,
            method: 'DELETE'
        })
    })
})

export const {
    useGetAllGamesQuery,
    useUpdateGameMutation,
    useDeleteGameMutation,
    useGetAllUsersQuery,
    useUpdateUserMutation,
    useDeleteUserMutation
} = adminAPI
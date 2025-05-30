import { apiSlice } from '../../shared/api/apiSlice.js'

export const adminAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllGames: builder.query({
            query: () => '/admin/games',
            providesTags: ['AdminGame']
        }),
        updateGame: builder.mutation({
            query: ({ id, gameData }) => ({
                url: `/admin/games/${id}`,
                method: 'PUT',
                body: gameData
            }),
            invalidatesTags: ['AdminGame', 'Game']
        }),
        deleteGame: builder.mutation({
            query: (id) => ({
                url: `/admin/games/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['AdminGame', 'Game']
        }),
        getAllUsers: builder.query({
            query: () => '/admin/users',
            providesTags: ['User']
        }),
        updateUserRole: builder.mutation({
            query: ({ userId, role }) => ({
                url: `/admin/users/${userId}/role`,
                method: 'PUT',
                body: { role }
            }),
            invalidatesTags: ['User']
        })
    })
})

export const {
    useGetAllGamesQuery,
    useUpdateGameMutation,
    useDeleteGameMutation,
    useGetAllUsersQuery,
    useUpdateUserRoleMutation
} = adminAPI
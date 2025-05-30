import { apiSlice } from '../../shared/api/apiSlice.js'

export const libraryAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserGames: builder.query({
            query: () => '/library/games',
            providesTags: ['LibraryGame']
        }),
        installGame: builder.mutation({
            query: (gameId) => ({
                url: `/library/games/${gameId}/install`,
                method: 'POST'
            }),
            invalidatesTags: ['LibraryGame']
        }),
        uninstallGame: builder.mutation({
            query: (gameId) => ({
                url: `/library/games/${gameId}/uninstall`,
                method: 'POST'
            }),
            invalidatesTags: ['LibraryGame']
        }),
        getCollections: builder.query({
            query: () => '/library/collections',
            providesTags: ['Collection']
        }),
        createCollection: builder.mutation({
            query: (collection) => ({
                url: '/library/collections',
                method: 'POST',
                body: collection
            }),
            invalidatesTags: ['Collection']
        }),
        updateGameProgress: builder.mutation({
            query: ({ gameId, progress }) => ({
                url: `/library/games/${gameId}/progress`,
                method: 'PUT',
                body: { progress }
            }),
            invalidatesTags: ['LibraryGame']
        })
    })
})

export const {
    useGetUserGamesQuery,
    useInstallGameMutation,
    useUninstallGameMutation,
    useGetCollectionsQuery,
    useCreateCollectionMutation,
    useUpdateGameProgressMutation
} = libraryAPI
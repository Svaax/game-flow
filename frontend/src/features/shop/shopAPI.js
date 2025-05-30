import { apiSlice } from '../../shared/api/apiSlice.js'

export const shopAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getGames: builder.query({
            query: (params) => ({
                url: '/games',
                params
            }),
            providesTags: ['Game']
        }),
        getGameDetails: builder.query({
            query: (id) => `/games/${id}`,
            providesTags: (result, error, id) => [{ type: 'Game', id }]
        }),
        addReview: builder.mutation({
            query: ({ gameId, review }) => ({
                url: `/games/${gameId}/reviews`,
                method: 'POST',
                body: review
            }),
            invalidatesTags: ['Game']
        })
    })
})

export const {
    useGetGamesQuery,
    useGetGameDetailsQuery,
    useAddReviewMutation
} = shopAPI
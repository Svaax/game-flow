// import { apiSlice } from '../../shared/api/apiSlice.js'
//
// export const communityAPI = apiSlice.injectEndpoints({
//     endpoints: (builder) => ({
//         getForumPosts: builder.query({
//             query: ({ page = 1, limit = 10 }) => ({
//                 url: '/forum-posts',
//                 params: { page, limit }
//             }),
//             providesTags: ['ForumPost']
//         }),
//         createForumPost: builder.mutation({
//             query: (post) => ({
//                 url: '/forum-posts',
//                 method: 'POST',
//                 body: post
//             }),
//             invalidatesTags: ['ForumPost']
//         }),
//         getGuides: builder.query({
//             query: (gameId) => `/guides?gameId=${gameId}`,
//             providesTags: ['Guide']
//         }),
//         createGuide: builder.mutation({
//             query: (guide) => ({
//                 url: '/guides',
//                 method: 'POST',
//                 body: guide
//             }),
//             invalidatesTags: ['Guide']
//         })
//     })
// })
//
// export const {
//     useGetForumPostsQuery,
//     useCreateForumPostMutation,
//     useGetGuidesQuery,
//     useCreateGuideMutation
// } = communityAPI
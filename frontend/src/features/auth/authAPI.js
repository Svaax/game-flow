import { apiSlice } from '../../shared/api/apiSlice.js'

export const authApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/users/login',
                method: 'POST',
                body: credentials,
            })
        }),
        register: builder.mutation({
            query: userData => ({
                url: '/users/signup',
                method: 'POST',
                body: userData
            })
        }),
    })
})

export const {
    useLoginMutation,
    useRegisterMutation
} = authApi
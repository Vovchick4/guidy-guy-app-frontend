import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/auth/',
    prepareHeaders: (headers, { getState }) => {
        // By default, if we have a token in the store, let's use that for authenticated requests
        const token = getState().auth.token
        if (token) {
            headers.set('authentication', `Bearer ${token}`)
        }
        return headers
    },
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 })

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithRetry,
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "login",
                method: 'POST',
                body: data
            }),
            extraOptions: {
                backoff: () => {
                    // We intentionally error once on login, and this breaks out of retrying. The next login attempt will succeed.
                    retry.fail({ fake: 'error' })
                },
            },
        })
    }),
})

// Exports Hooks
export const { useLoginMutation } = authApi

// Exports Endpoints
export const {
    endpoints: { login },
} = authApi
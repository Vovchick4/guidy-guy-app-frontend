import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

import { baseUrlApi } from '../../constants'
import { setToken, defaultResponse } from './helpers'

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
    baseUrl: `${baseUrlApi}/auth/`,
    prepareHeaders: setToken,
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
            transformResponse: defaultResponse,
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
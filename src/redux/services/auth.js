import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

import { baseUrlApi } from '../../constants'
import { setUser } from '../features/authSlice'
import { setToken, defaultResponse } from './helpers'

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
    baseUrl: `${baseUrlApi}/auth/`,
    prepareHeaders(headers) {
        return headers;
    },
    // prepareHeaders: setToken,
})

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery,
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "log-in",
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    const res = await queryFulfilled;
                    console.log(res);
                    // await dispatch(authApi.endpoints.getUser.initiate(null));
                } catch ({ error: { data: { message } } }) {
                    alert(message);
                }
            }
        }),
        getUser: builder.query({
            query: () => ({
                url: 'get-user',
                credentials: 'include',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;
                    console.log(res);
                    dispatch(setUser(res));
                } catch ({ error: { data: { message } } }) {
                    alert(message);
                }
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
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

import { toast } from 'react-toastify'
import { baseUrlApi } from '../../constants'
import { setUser } from '../features/authSlice'

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
    baseUrl: `${baseUrlApi}/auth/`,
})

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery,
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "sign-up",
                method: 'POST',
                body: data
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    await dispatch(authApi.endpoints.getUser.initiate(null));
                } catch (error) {
                }
            }
        }),
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
                    await dispatch(authApi.endpoints.getUser.initiate(null));
                } catch (error) {
                }
            }
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'log-out',
                method: 'POST',
                credentials: 'include',
            }),
        }),
        getUser: builder.query({
            query: () => ({
                url: 'get-user',
                credentials: 'include',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(setUser(data));
                } catch ({ error: { data } }) {
                    toast.error(data?.message)
                }
            },
        })
    }),
})

// Exports Hooks
export const { useLoginMutation, useRegisterMutation, useLogoutQuery, useGetUserQuery } = authApi

// Exports Endpoints
export const {
    endpoints: { login },
} = authApi
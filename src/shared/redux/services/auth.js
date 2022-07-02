import { createApi } from '@reduxjs/toolkit/query/react'

import { toast } from 'react-toastify'
import { logout, setUser } from '../features/authSlice'
import customFetchBase from './helpers/customFetchBase'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: customFetchBase,
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        registerAdmin: builder.mutation({
            query: (data) => ({
                url: "/auth/sign-up-admin",
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: "/auth/sign-up",
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(authApi.endpoints.getUser.initiate(null, { forceRefetch: true }));
                } catch (error) {
                }
            }
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/auth/log-in",
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(authApi.endpoints.getUser.initiate(null, { forceRefetch: true }));
                } catch (error) {
                }
            }
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/log-out',
                method: 'POST',
                credentials: 'include',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                queryFulfilled
                    // Error with Parse JSON
                    .then(res => {
                        dispatch(logout())
                        toast.success("UserLogOutAccount")
                    })
                    .catch(({ error: { data } }) => {
                        toast.error(data?.message)
                    })
            }
        }),
        getUser: builder.query({
            query: () => ({
                url: '/auth/get-user',
                credentials: 'include',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(setUser(data))
                } catch ({ error: { data } }) {
                    dispatch(logout())
                    toast.error(data?.message)
                }
            },
        })
    }),
})

// Exports Hooks
export const { useLoginMutation, useRegisterAdminMutation, useRegisterMutation, useLogoutMutation, useGetUserQuery } = authApi

// Exports Endpoints
export const {
    endpoints: { login },
} = authApi
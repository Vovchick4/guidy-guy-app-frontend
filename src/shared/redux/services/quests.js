import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import customFetchBase from './helpers/customFetchBase'

export const questsApi = createApi({
    reducerPath: 'questsApi',
    baseQuery: customFetchBase,
    tagTypes: ['Quests'],
    endpoints: (builder) => ({
        createQuest: builder.mutation({
            query: (userId, data) => ({
                url: `/quest/create/${userId}`,
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
        }),
        getAllQuests: builder.query({
            query: () => ({
                url: "/quest/find-all",
                credentials: 'include',
            }),
        }),
        getQuestById: builder.query({
            query: (userId, questId) => ({
                url: `/quest/${userId}/${questId}`,
                credentials: 'include',
            }),
        }),
        getAllQuestsByUserId: builder.query({
            query: (userId) => ({
                url: `/quest/${userId}`,
                credentials: 'include',
            }),
        }),
    })
})

// Export Hooks
export const {
    useCreateQuestMutation,
    useGetAllQuestsQuery,
    useGetQuestByIdQuery,
    useGetAllQuestsByUserIdQuery } = questsApi
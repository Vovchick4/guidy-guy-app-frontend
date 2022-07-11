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
            query: () => `/quest/find-all`
        }),
        getQuestById: builder.query({
            query: (userId, questId) => `/quest/${userId}/${questId}`
        }),
        getAllQuestsByUserId: builder.query({
            query: (userId) => `/quest/${userId}`
        }),
    })
})

// Export Hooks
export const {
    useCreateQuestMutation,
    useGetAllQuestsQuery,
    useGetQuestByIdQuery,
    useGetAllQuestsByUserIdQuery } = questsApi
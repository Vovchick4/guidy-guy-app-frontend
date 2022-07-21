import { createApi } from '@reduxjs/toolkit/query/react'

import { defaultResponse } from './helpers'
import customFetchBase from './helpers/customFetchBase'

export const placesApi = createApi({
    reducerPath: 'placesApi',
    baseQuery: customFetchBase,
    tagTypes: ['Places'],
    endpoints: (builder) => ({
        createPlace: builder.mutation({
            query: (data) => ({
                url: `/places/`,
                method: "POST",
                body: data,
                credentials: 'include'
            }),
            providesTags: ['CreatePlace']
        }),
        updatePlace: builder.mutation({
            query: (placeId, data) => ({
                url: `/places/${placeId}`,
                method: "PATCH",
                body: data,
                credentials: 'include'
            }),
            providesTags: ['UpdatePlace']
        }),
        removePlace: builder.mutation({
            query: (placeId) => ({
                url: `/places/${placeId}`,
                method: "DELETE",
                credentials: 'include'
            }),
            providesTags: ['RemovePlace']
        }),
        getPlaces:
            builder.query({
                query: (params) => {
                    let url = `/places?`
                    Object.keys(params).forEach((key) => {
                        url += `${key}=${params[key]}&`
                    })
                    return url
                },
                providesTags: ['Places']
            }),
        getPlacesById: builder.query({
            query: (placeId) => `/places/${placeId}`,
            transformResponse: defaultResponse,
            providesTags: ['Place']
        })
    })
})

// Exports Hooks
export const {
    useCreatePlaceMutation,
    useUpdatePlaceMutation,
    useRemovePlaceMutation,
    useGetPlacesQuery, useGetPlacesByIdQuery } = placesApi
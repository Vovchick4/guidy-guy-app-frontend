import { createApi } from '@reduxjs/toolkit/query/react'
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
            providesTags: ['Place', 'CreatePlace'],
            invalidatesTags: ['Place']
        }),
        updatePlace: builder.mutation({
            query: (data) => ({
                url: `/places/${data.placeId}`,
                method: "PUT",
                body: data,
                credentials: 'include'
            }),
            providesTags: ['Place', 'UpdatePlace'],
            invalidatesTags: ['Place']
        }),
        removePlace: builder.mutation({
            query: (placeId) => ({
                url: `/places/${placeId}`,
                method: "DELETE",
                credentials: 'include'
            }),
            providesTags: ['Place', 'RemovePlace'],
            invalidatesTags: ['Place']
        }),
        uploadImagePlace: builder.mutation({
            query: (data) => ({
                url: `/places/photos`,
                method: "POST",
                body: data,
                credentials: 'include'
            }),
            providesTags: ['Place', 'UploadImagePlace'],
            invalidatesTags: ['Place']
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
                providesTags: ['Place', 'Places']
            }),
        getPlacesById: builder.query({
            query: (placeId) => `/places/${placeId}`,
            providesTags: ['Place'],
            invalidatesTags: ['Place']
        })
    })
})

// Exports Hooks
export const {
    useUploadImagePlaceMutation,
    useCreatePlaceMutation,
    useUpdatePlaceMutation,
    useRemovePlaceMutation,
    useGetPlacesQuery, useGetPlacesByIdQuery } = placesApi
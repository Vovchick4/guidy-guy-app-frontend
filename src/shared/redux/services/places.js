import { createApi } from '@reduxjs/toolkit/query/react'

import { defaultResponse } from './helpers'
import customFetchBase from './helpers/customFetchBase'

export const placesApi = createApi({
    reducerPath: 'placesApi',
    baseQuery: customFetchBase,
    tagTypes: ['Places'],
    endpoints: (builder) => ({
        getPlaces:
            builder.query({
                query: (params) => {
                    let url = `/places?`
                    Object.keys(params).forEach((key) => {
                        url += `${key}=${params[key]}&`
                    })
                    return url
                },
                transformResponse: defaultResponse,
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
export const { useGetPlacesQuery } = placesApi
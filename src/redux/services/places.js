import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { baseUrlApi } from '../../constants'
import { defaultResponse } from './helpers'

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
    baseUrl: `${baseUrlApi}/places/`,
})

export const placesApi = createApi({
    reducerPath: 'placesApi',
    baseQuery,
    tagTypes: ['Places'],
    endpoints: (builder) => ({
        getPlaces:
            builder.query({
                query: (params) => {
                    let url = `?`
                    Object.keys(params).forEach((key) => {
                        url += `${key}=${params[key]}&`
                    })
                    return url
                },
                transformResponse: defaultResponse,
                providesTags: ['Places']
            }),
        getPlacesById: builder.query({
            query: (placeId) => `/${placeId}`,
            transformResponse: defaultResponse,
            providesTags: ['Place']
        })
    })
})

// Exports Hooks
export const { useGetPlacesQuery } = placesApi
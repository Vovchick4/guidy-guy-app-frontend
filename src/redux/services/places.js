import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/places/',
})

export const placesApi = createApi({
    reducerPath: 'placesApi',
    baseQuery: baseQuery,
    tagTypes: ['Places'],
    endpoints: (builder) => ({
        getPlaces:
            builder.query({
                query: () => '/',
                providesTags: ['Places']
            }),
        getPlacesById: builder.query({
            query: (placeId) => `/${placeId}`,
            providesTags: ['Place']
        })
    })
})

// Exports Hooks
export const { useGetPlacesQuery } = placesApi
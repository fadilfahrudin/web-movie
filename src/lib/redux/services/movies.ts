import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { movieApi } from '@/config/api-config';

const { baseUrl, api_key } = movieApi

export const moviesApi: any = createApi({
    reducerPath: 'moviesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    endpoints: (builder) => ({
        getTrending: builder.query({
            query: () => `trending/movie/day?api_key=${api_key}`
        }),
        getBySearch: builder.query({
            query: (keyword) => `search/movie?query=${keyword}&page=1&include_adult=false&language=en-US&year=2022&api_key=${api_key}`
        }),
        getSimiler: builder.query({
            query: (id) => `movie/${id}/recommendations?api_key=${api_key}&page=1&language=en-US`
        }),
        getCollection: builder.query({
            query: (id) => `collection/${id}?api_key=${api_key}`
        }),
        getVideo: builder.query({
            query: (id) => `movie/${id}/videos?api_key=${api_key}`
        }),
        getPopular: builder.query({
            query: () => `movie/popular?api_key=${api_key}&page=1&language=en-US`
        }),
        getById: builder.query({
            query: (id) => `movie/${id}?api_key=${api_key}`
        }),
        getCredit: builder.query({
            query: (id) => `movie/${id}/credits?api_key=${api_key}`
        }),
        getNowPlaying: builder.query({
            query: () => `movie/now_playing?api_key=${api_key}&language=en-US&page=1`
        })
    })
})

export const { useGetNowPlayingQuery, useGetCreditQuery, useGetByIdQuery, useGetPopularQuery, useGetVideoQuery, useGetTrendingQuery, useGetBySearchQuery, useGetSimilerQuery, useGetCollectionQuery } = moviesApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { movieApi } from '@/config/api-config';

const { baseUrl, api_key } = movieApi

export const moviesApi: any = createApi({
    reducerPath: 'moviesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    endpoints: (builder) => ({
        getUpcomming: builder.query({
            query: (page) => `movie/upcoming?api_key=${api_key}&page=${page || 1}&language=en-US`
        }),
        getTopRated: builder.query({
            query: (page) => `movie/top_rated?api_key=${api_key}&page=${page || 1}&language=en-US`
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
            query: (page) => `movie/popular?api_key=${api_key}&page=${page || 1}&language=en-US`
        }),
        getById: builder.query({
            query: (id) => `movie/${id}?api_key=${api_key}`
        }),
        getCredit: builder.query({
            query: (id) => `movie/${id}/credits?api_key=${api_key}`
        }),
        getNowPlaying: builder.query({
            query: (page) => `movie/now_playing?api_key=${api_key}&language=en-US&page=${page || 1}`
        }),
        getDiscover: builder.query({
            query: ([page, year]) => `discover/movie?api_key=${api_key}&page=${page || 1}&include_adult=false&language=en-US&year=${year}`
        })
    })
})

export const {
    useGetUpcommingQuery, useGetTopRatedQuery, useGetDicoverQuery, useGetNowPlayingQuery, useGetCreditQuery, useGetByIdQuery, useGetPopularQuery, useGetVideoQuery, useGetBySearchQuery, useGetSimilerQuery, useGetCollectionQuery
} = moviesApi
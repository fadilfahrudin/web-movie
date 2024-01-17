import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { movieApi } from '@/config/api-config';

const { baseUrl, api_key } = movieApi;

export type SeriesType = {
    id: number,
    episode_number: number,
    season_number: number,
}

export const seriesApi = createApi({
    reducerPath: 'seriesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    endpoints: (builder) => ({
        getAiringToday: builder.query({
            query: (page) => `tv/airing_today?api_key=${api_key}&page=${page || 1}&language=en-US`
        }),
        getPopularSeries: builder.query({
            query: (page) => `tv/popular?api_key=${api_key}&page=${page || 1}&language=en-US`
        }),
        getTopRateSeries: builder.query({
            query: (page) => `tv/top_rated?api_key=${api_key}&page=${page || 1}&language=en-US`
        }),
        getSeriesById: builder.query({
            query: (id) => `tv/${id}?api_key=${api_key}&language=en-US`
        }),
        getVideoSeries: builder.query({
            query: (id) => `tv/${id}/videos?api_key=${api_key}&language=en-US`
        }),
        getTvSeasons: builder.query({
            query: ({ id, season_number }) => `tv/${id}/season/${season_number}?api_key=${api_key}&language=en-US`
        }),
        getTvEpisodeGroup: builder.query({
            query: (tv_episode_group_id) => `episode_group/${tv_episode_group_id}?api_key=${api_key}&language=en-US`
        }),
        getDetailTvEpisode: builder.query({
            query: ({ id, episode_number, season_number }: SeriesType) => `tv/${id}/season/${season_number}/episode/${episode_number}?api_key=${api_key}&language=en-US`
        })
    })
})

export const { useGetAiringTodayQuery, useGetPopularSeriesQuery, useGetTopRateSeriesQuery, useGetSeriesByIdQuery, useGetVideoSeriesQuery, useGetTvSeasonsQuery, useGetTvEpisodeGroupQuery, useGetDetailTvEpisodeQuery } = seriesApi
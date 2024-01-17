"use client"
import { useGetNowPlayingQuery, useGetPopularQuery, useGetTopRatedQuery, useGetUpcommingQuery } from "@/lib/redux/services/movies"
import { useSelector } from "react-redux"
export const useInfinitLoop = () => {
    const { path, page } = useSelector((state: any) => state.movie.filter)
    const { data: nowplaying, isSuccess: playingSuccess } = useGetNowPlayingQuery(page)
    const { data: popular, isSuccess: popSuccess } = useGetPopularQuery(page)
    const { data: topRated, isSuccess: topSuccess } = useGetTopRatedQuery(page)
    const { data: upComming, isSuccess: upcomSuccess } = useGetUpcommingQuery(page)
    switch (path) {
        case "popular":
            return popSuccess && popular.results
        case "now_playing":
            return playingSuccess && nowplaying.results
        case "top_rated":
            return topSuccess && topRated.results
        case "upcoming":
            return upcomSuccess && upComming.results
    }
}


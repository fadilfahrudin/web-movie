"use client"
import { useGetNowPlayingQuery, useGetPopularQuery, useGetTopRatedQuery, useGetUpcommingQuery } from "@/lib/redux/services/movies"
import CardMovie, { MovieType } from "../atomic/CardMovie"
import { useSelector, useDispatch } from "react-redux"
import { setMovies } from "@/lib/redux/slice/movieSlice"
import { useEffect } from "react"
import { setLoading } from "@/lib/redux/slice/loadingSlice"

const MoviesComponent = () => {
    const dispatch = useDispatch()
    const { movies, currentPage, moviePath } = useSelector((state: any) => state.movie)
    const { data: nowplaying, isSuccess: playingSuccess } = useGetNowPlayingQuery(currentPage)
    const { data: popular, isSuccess: popSuccess } = useGetPopularQuery(currentPage)
    const { data: topRated, isSuccess: topSuccess } = useGetTopRatedQuery(currentPage)
    const { data: upComming, isSuccess: upcomSuccess } = useGetUpcommingQuery(currentPage)

    useEffect(() => {
        if (moviePath == "popular" && popSuccess) {
            dispatch(setLoading(false))
            dispatch(setMovies(popular.results))
        } else if (moviePath == "top_rated" && topSuccess) {
            dispatch(setLoading(false))
            dispatch(setMovies(topRated.results))
        } else if (moviePath == "upcoming" && upcomSuccess) {
            dispatch(setLoading(false))
            dispatch(setMovies(upComming.results))
        } else if (moviePath == "now_playing" && playingSuccess) {
            dispatch(setLoading(false))
            playingSuccess && dispatch(setMovies(nowplaying.results))
        }
    }, [dispatch, currentPage, popular, moviePath, topRated, popSuccess, topSuccess, playingSuccess, nowplaying, upComming, upcomSuccess])

    return movies.map((item: MovieType, i: number) => (
        <CardMovie title={item.title} orientation="portrait" id={item.id} index={i} key={item.id} poster_path={item.poster_path ?? ""} backdrop_path={item.backdrop_path ?? ""} />
    ));

}

export default MoviesComponent
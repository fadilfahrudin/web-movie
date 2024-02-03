/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useDispatch, useSelector } from 'react-redux';
import { setMovies } from "@/lib/redux/slice/movieSlice";
import { useGetNowPlayingQuery, useGetPopularQuery, useGetTopRatedQuery, useGetUpcommingQuery } from "@/lib/redux/services/movies";
import { useGetAiringTodayQuery, useGetPopularSeriesQuery, useGetTopRateSeriesQuery } from "@/lib/redux/services/series";
import { setSeries } from "@/lib/redux/slice/seriesSlice";
let page = 2
const IniniteLoad = ({ tv }: { tv?: boolean }) => {
    const { series, seriesPath } = useSelector((state: any) => state.series)
    const { movies, moviePath } = useSelector((state: any) => state.movie)


    const { data: airingToday, isSuccess: airingSuccess } = useGetAiringTodayQuery(page)
    const { data: serPopular, isSuccess: serPopSuccess } = useGetPopularSeriesQuery(page)
    const { data: serTopRated, isSuccess: serTopSuccess } = useGetTopRateSeriesQuery(page)

    const { data: nowplaying, isSuccess: playingSuccess } = useGetNowPlayingQuery(page)
    const { data: popular, isSuccess: popSuccess } = useGetPopularQuery(page)
    const { data: topRated, isSuccess: topSuccess } = useGetTopRatedQuery(page)
    const { data: upComming, isSuccess: upcomSuccess } = useGetUpcommingQuery(page)
    const dispatch = useDispatch()
    const { ref, inView } = useInView()

    const infiniteLoadMovie = () => {
        if (moviePath == "popular" && popSuccess) {
            dispatch(setMovies([...movies, ...popular.results]))
        } else if (moviePath == "top_rated" && topSuccess) {
            dispatch(setMovies([...movies, ...topRated.results]))
        } else if (moviePath == "upcoming" && upcomSuccess) {
            dispatch(setMovies([...movies, ...upComming.results]))
        } else if (moviePath == "now_playing" && playingSuccess) {
            dispatch(setMovies([...movies, ...nowplaying.results]))
        }
        page++
    }

    const infiniteLoadSeries = () => {
        if (seriesPath == "popular" && serPopSuccess) {
            dispatch(setSeries([...series, ...serPopular.results]))
        } else if (seriesPath == "top_rated" && serTopSuccess) {
            dispatch(setSeries([...series, ...serTopRated.results]))
        } else if (seriesPath == "airing_today" && airingSuccess) {
            dispatch(setSeries([...series, ...airingToday.results]))
        }
        page++
    }

    useEffect(() => {
        if (inView) {
            if (tv) {
                infiniteLoadSeries()
            } else {
                infiniteLoadMovie()
            }
        }
    }, [dispatch, inView, moviePath])

    const style = {
        color: 'white',
        fontSize: '24px',
        marginTop: '20px'
    }

    return (
        <p ref={ref} style={style}>Loading...</p>
    )
}

export default IniniteLoad
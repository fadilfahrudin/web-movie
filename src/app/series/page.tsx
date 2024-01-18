"use client"
/* eslint-disable @next/next/no-img-element */
import ButtonBackToTop from "@/app/components/atomic/ButtonBackToTop"
import ButtonFilter from "@/app/components/atomic/ButtonFilter"
import CardMovie, { MovieType } from "@/app/components/atomic/CardMovie"
import LoadPage from "@/app/components/atomic/LoadPage"
import Loading from "@/app/components/atomic/loading"
import { useGetAiringTodayQuery, useGetPopularSeriesQuery, useGetTopRateSeriesQuery } from "@/lib/redux/services/series"
import { setLoading } from "@/lib/redux/slice/loadingSlice"
import { setSeries } from "@/lib/redux/slice/seriesSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
export default function Series() {
    const dispatch = useDispatch()
    const { isLoading } = useSelector((state: any) => state.loading)
    const { series, currentPage, seriesPath } = useSelector((state: any) => state.series)
    const { data: airingToday, isSuccess: airingSuccess } = useGetAiringTodayQuery(currentPage)
    const { data: popular, isSuccess: popSuccess } = useGetPopularSeriesQuery(currentPage)
    const { data: topRated, isSuccess: topSuccess } = useGetTopRateSeriesQuery(currentPage)

    useEffect(() => {
        if (seriesPath == "popular" && popSuccess) {
            dispatch(setLoading(false))
            dispatch(setSeries(popular.results))
        } else if (seriesPath == "top_rated" && topSuccess) {
            dispatch(setLoading(false))
            dispatch(setSeries(topRated.results))
        } else if (seriesPath == "airing_today" && airingSuccess) {
            dispatch(setLoading(false))
            dispatch(setSeries(airingToday.results))
        }
    }, [dispatch, currentPage, popular, topRated, popSuccess, topSuccess, airingSuccess, seriesPath, airingToday])


    return (
        <>
            {isLoading ? <LoadPage /> :
                <section id="movies">
                    <div className="filter-wrapper">
                        <ButtonFilter nameBtn="Populer" pathName="popular" series={true} />
                        <ButtonFilter nameBtn="Top Rated" pathName="top_rated" series={true} />
                        <ButtonFilter nameBtn="Airing Today" pathName="airing_today" series={true} />
                    </div>

                    <div className="movie-listing">
                        {series.map((item: MovieType, i: number) => (
                            <CardMovie media_type="tv" name={item.name} orientation="portrait" id={item.id} index={i} key={item.id} poster_path={item.poster_path ?? ""} backdrop_path={item.backdrop_path ?? ""} />
                        ))}
                    </div>
                    <Loading tv={true} />

                    <ButtonBackToTop />
                </section>
            }
        </>
    )
}
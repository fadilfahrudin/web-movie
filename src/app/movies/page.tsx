"use client"
/* eslint-disable @next/next/no-img-element */
import ButtonBackToTop from "@/components/atomic/ButtonBackToTop"
import ButtonFilter from "@/components/atomic/ButtonFilter"
import CardMovie, { MovieType } from "@/components/atomic/CardMovie"
import LoadPage from "@/components/atomic/LoadPage"
import Loading from "@/components/atomic/loading"
import { useGetNowPlayingQuery, useGetPopularQuery, useGetTopRatedQuery, useGetUpcommingQuery } from "@/lib/redux/services/movies"
import { setLoading } from "@/lib/redux/slice/loadingSlice"
import { setMovies } from "@/lib/redux/slice/movieSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
export default function Movies() {
    const { isLoading } = useSelector((state: any) => state.loading)
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


    return (
        <>
            {isLoading ? <LoadPage /> :
                <section id="movies">
                    <div className="filter-wrapper">
                        <ButtonFilter nameBtn="Populer" pathName="popular" />
                        <ButtonFilter nameBtn="Top Rated" pathName="top_rated" />
                        <ButtonFilter nameBtn="Playing Now" pathName="now_playing" />
                        <ButtonFilter nameBtn="Upcoming" pathName="upcoming" />
                    </div>

                    <div className="movie-listing">
                        {movies.map((item: MovieType, i: number) => (
                            <CardMovie title={item.title} orientation="portrait" id={item.id} index={i} key={item.id} poster_path={item.poster_path ?? ""} backdrop_path={item.backdrop_path ?? ""} />
                        ))}
                    </div>
                    <Loading />

                    <ButtonBackToTop />
                </section>
            }
        </>
    )
}
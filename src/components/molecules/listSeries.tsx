/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect, useRef, useState } from 'react'
import CardMovie, { MovieType } from "../atomic/CardMovie"

import { useGetAiringTodayQuery, useGetPopularSeriesQuery, useGetTopRateSeriesQuery } from "@/lib/redux/services/series"
import { swipeLeft, swipeRight } from '@/assets/icon'
import { useSelector } from 'react-redux'


export type ListMovieProps = {
    listTitle?: string,
    listLimit?: number,
    listPath?: string,
    listType: "movies" | "featured",
    movieId?: number,
    collectionId?: number,
    imgOrientation: "landscape" | "portrait"
    keyword?: string,
}


const ListSeries = ({ listType, listPath, listTitle, movieId, imgOrientation, keyword }: ListMovieProps) => {
    const [scroll, setScroll] = useState(0)
    const ref = useRef<HTMLDivElement>(null)
    const { currentPage } = useSelector((state: any) => state.series)
    const { data: airingToday, isSuccess: airingSuccess } = useGetAiringTodayQuery(currentPage)
    const { data: popular, isSuccess: popSucess } = useGetPopularSeriesQuery(currentPage)
    const { data: topRate, isSuccess: topRateSuccess } = useGetTopRateSeriesQuery(currentPage)


    const swipe = (direction: string) => {
        if (ref.current) {
            const { scrollLeft, clientWidth } = ref.current
            const scrollTo = direction === "left"
                ? scrollLeft - clientWidth
                : scrollLeft + clientWidth
            ref.current.scrollTo({ left: scrollTo, behavior: "smooth" })
            setScroll(scrollTo)
        }
    }


    return (
        <div className="listMovie">
            <div className="listTitle">{listTitle}</div>
            {listType == "featured" ?
                <>
                    <button className={`btn-swipe ic-left ${scroll <= 0 ? "hidden" : ""}`} onClick={() => swipe("left")} aria-label="swipe button"> <img src={swipeLeft.src} alt="Swipe Left" width={24} height={24} /> </button>
                    <button className="btn-swipe ic-right" onClick={() => swipe("right")} aria-label="swipe button"> <img src={swipeRight.src} alt="Swipe Right" width={24} height={24} /> </button>
                </> : ""
            }
            <div className={`${listType == "movies" ? "movie-listing" : "featured"} ${imgOrientation == "landscape" ? "landscape" : ""}`} ref={ref}>

                {listPath == "airing_today" && airingSuccess && airingToday.results.map((item: MovieType, i: number) => (
                    <CardMovie title={item.title} name={item.name} media_type="tv" orientation={imgOrientation} id={item.id} index={i} key={item.id} poster_path={item.poster_path ?? ""} backdrop_path={item.backdrop_path} />
                ))}

                {listPath == "popular" && popSucess && popular.map((item: MovieType, i: number) => (
                    <CardMovie title={item.title} name={item.name} media_type="tv" orientation={imgOrientation} id={item.id} index={i} key={item.id} poster_path={item.poster_path ?? ""} backdrop_path={item.backdrop_path} />
                ))}

                {listPath == "top_rated" && topRateSuccess && topRate.map((item: MovieType, i: number) => (
                    <CardMovie title={item.title} name={item.name} media_type="tv" orientation={imgOrientation} id={item.id} index={i} key={item.id} poster_path={item.poster_path ?? ""} backdrop_path={item.backdrop_path} />
                ))}

            </div>
        </div>
    )
}

export default ListSeries;
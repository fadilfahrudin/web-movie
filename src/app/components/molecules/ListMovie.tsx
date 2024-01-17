/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useRef, useState } from 'react'
import CardMovie, { MovieType } from "../atomic/CardMovie"

import { useGetBySearchQuery, useGetCollectionQuery, useGetSimilerQuery, useGetNowPlayingQuery, useGetPopularQuery } from "@/lib/redux/services/movies"
import { swipeLeft, swipeRight } from '@/assets/icon'


export type ListMovieProps = {
    listTitle?: string,
    listLimit?: number,
    listPath?: string,
    listType: "movies" | "featured",
    movieId?: number,
    collectionId?: number,
    imgOrientation: "landscape" | "portrait"
}


const ListMovie = ({ listType, listLimit, listPath, listTitle, movieId, collectionId, imgOrientation }: ListMovieProps) => {
    const [scroll, setScroll] = useState(0)
    const ref = useRef<HTMLDivElement>(null)
    const { data: query, isSuccess: querySuccess, isLoading: queryLoad } = useGetBySearchQuery("Spider Man")
    const { data: collection, isSuccess: collectionSuccess, isLoading: collecLoad } = useGetCollectionQuery(collectionId)
    const { data: similar, isSuccess: similarSuccess, isLoading: similarLoad } = useGetSimilerQuery(movieId)
    const { data: nowplaying, isSuccess: playingSuccess, isLoading: nowPlayLoad } = useGetNowPlayingQuery()
    const { data: trending, isSuccess: trendingSuccess, isLoading: trendingLoad } = useGetPopularQuery()
    const filterCollection = collectionSuccess && collection.parts.filter((item: MovieType) => item.id !== parseInt(String(movieId ?? "0")))


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
                {listPath == "trending" && trendingSuccess && trending.results.slice(0, listLimit).map((item: MovieType, i: number) => (
                    <CardMovie isLoading={trendingLoad} isSuccess={trendingSuccess} title={item.title} orientation={imgOrientation} id={item.id} index={i} key={item.id} poster_path={item.poster_path ?? ""} backdrop_path={item.backdrop_path ?? ""} />
                ))}

                {listPath == "query" && querySuccess && query.results.map((item: MovieType, i: number) => (
                    <CardMovie title={item.title} orientation={imgOrientation} id={item.id} index={i} key={item.id} poster_path={item.poster_path ?? ""} backdrop_path={item.backdrop_path} />
                ))}

                {listPath == "sequel" && collectionSuccess && filterCollection.map((item: MovieType, i: number) => (
                    <CardMovie title={item.title} orientation={imgOrientation} id={item.id} index={i} key={item.id} poster_path={item.poster_path ?? ""} backdrop_path={item.backdrop_path} />
                ))}

                {listPath == "similar" && similarSuccess && similar.results.length > 0 ? similar.results.map((item: MovieType, i: number) => (
                    <CardMovie orientation={imgOrientation} id={item.id} index={i} key={item.id} poster_path={item.poster_path ?? ""} backdrop_path={item.backdrop_path} />
                )) : ""}

                {listPath == "playingNow" && playingSuccess && nowplaying.results.map((item: MovieType, i: number) => (
                    <CardMovie title={item.title} orientation={imgOrientation} id={item.id} index={i} key={item.id} poster_path={item.poster_path ?? ""} backdrop_path={item.backdrop_path} />
                ))}
            </div>
        </div>
    )
}

export default ListMovie
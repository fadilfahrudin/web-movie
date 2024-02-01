"use client"
/* eslint-disable @next/next/no-img-element */
import { useGetPopularQuery, useGetByIdQuery } from "@/lib/redux/services/movies"
import { movieApi } from "@/config/api-config"
import { useEffect, useState } from "react"
import { favotites } from "@/assets/icon"
import { useRouter } from "next/navigation"
import { MovieType } from "../atomic/CardMovie"
import Iframe from "../atomic/Iframe"
import { skipToken } from "@reduxjs/toolkit/query"

const Header = () => {
    const router = useRouter()
    const { data: popular, isSuccess: popularSuccess } = useGetPopularQuery()
    const filter = popularSuccess && popular.results.filter((item: any) => item.popularity > 900)
    const [movieId, setMovieId] = useState<number>()

    useEffect(() => {
        if (popularSuccess && movieId === undefined) {
            setMovieId(popularSuccess && filter[0].id)
        }
    }, [filter, popularSuccess, movieId])

    const { data: movieData, isSuccess: movieSuccess } = useGetByIdQuery(movieId ?? skipToken)

    const { thumb } = movieApi
    const { id, title, overview, genres, runtime, release_date, vote_average } = movieSuccess && movieData

    return (
        <header>
            <div className="landscape-poster">
                {movieId !== undefined && (
                    <Iframe id={movieId} media_type="movie" playerVars={{ origin: "http://localhost:3000" }} />
                )}
            </div>
            <div className="detail-movie">
                <h5 className="rate"><img src={favotites.src} alt="Favorites" width={18} height={18} /> {movieSuccess && vote_average.toFixed(1)} Ratings</h5>
                <h1>{title}</h1>
                <h5>{movieSuccess && release_date.split("-")[0]} | {movieSuccess && genres.map((item: any) => item.name).join(", ")} | {runtime} minutes</h5>
                <p>{overview}</p>
                <button type='button' className='btn-watch' onClick={() => router.push(`/movie/${id}`)}>Watch</button>
            </div>
            <div className="top-movies">
                <div className="movie-list">
                    {popularSuccess && filter.slice(0, 4).map((item: MovieType, i: number) => (
                        <button key={item.id} className={`top-movie-card ${item.id === movieId ? "active" : ""}`} onClick={() => setMovieId(item.id ?? 0)}>
                            <img src={thumb(item.backdrop_path ?? "")} alt={item.title} width="100%" height="100%" />
                        </button>
                    ))}
                </div>
            </div>
        </header>
    )
}

export default Header
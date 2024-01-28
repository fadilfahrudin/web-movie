"use client"
/* eslint-disable @next/next/no-img-element */
import { useGetVideoQuery, useGetPopularQuery, useGetByIdQuery } from "@/lib/redux/services/movies"
import { movieApi } from "@/config/api-config"
import { useEffect, useState } from "react"
import { favotites } from "@/assets/icon"
import { useRouter } from "next/navigation"
import { MovieType } from "../atomic/CardMovie"

const Header = () => {
    const router = useRouter()
    const { data: popular, isSuccess: popularSuccess } = useGetPopularQuery()
    const filter = popularSuccess && popular.results.filter((item: any) => item.popularity > 900)
    const [Id, setId] = useState(Number)

    const { data: movieId, isSuccess: movieIdSuccess } = useGetByIdQuery(Id)
    const { data, isSuccess } = useGetVideoQuery(Id)

    const { thumb } = movieApi
    const trailer = isSuccess ? data.results.find((item: any) => item.type === "Trailer") : {}
    const { key } = trailer

    useEffect(() => {
        if (Id == 0) {
            setId(popularSuccess && filter[0].id)
        }
    }, [Id, filter, popularSuccess])

    const { id, title, overview, genres, runtime, release_date, vote_average } = movieIdSuccess && movieId


    return (
        <header>
            <div className="landscape-poster">
                {isSuccess && (
                    // <iframe width="560" height="315" src={`https://www.youtube.com/embed/${key}?si=mEqWJFl86CH6C3CA&controls=0&autoplay=1&mute=1&loop=1`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    <iframe
                        src={`https://www.youtube.com/embed/${key}?si=mEqWJFl86CH6C3CA&playlist=${key}&controls=0&autoplay=1&mute=1&loop=1&rel=0&showinfo=0&modestbranding=1`}
                        width="560" height="315"
                        title='YouTube video player'
                        allow='accelerometer; autoplay; clipboard-write; '
                        allowFullScreen></iframe>
                )}
            </div>
            <div className="detail-movie">
                <h5 className="rate"><img src={favotites.src} alt="Favorites" width={18} height={18} /> {movieIdSuccess && vote_average.toFixed(1)} Ratings</h5>
                <h1>{title}</h1>
                <h5>{movieIdSuccess && release_date.split("-")[0]} | {movieIdSuccess && genres.map((item: any) => item.name).join(", ")} | {runtime} minutes</h5>
                <p>{overview}</p>
                <button type='button' className='btn-watch' onClick={() => router.push(`/movie/${id}`)}>Watch</button>
            </div>
            <div className="top-movies">
                <div className="movie-list">
                    {popularSuccess && filter.slice(0, 4).map((item: MovieType, i: number) => (
                        <button key={item.id} className={`top-movie-card ${item.id === Id ? "active" : ""}`} onClick={() => setId(item.id ?? 0)}>
                            <img src={thumb(item.backdrop_path ?? "")} alt={item.title} width="100%" height="100%" />
                        </button>
                    ))}
                </div>
            </div>
        </header>
    )
}

export default Header
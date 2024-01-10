/* eslint-disable @next/next/no-img-element */
import ButtonBackToTop from "@/components/atomic/ButtonBackToTop"
import CardMovie, { MovieType } from "@/components/atomic/CardMovie"
import { movieApi } from "@/config/api-config"
// import { useState } from "react"
export async function MovieDAta() {
    const { api_key, baseUrl } = movieApi
    const res = await fetch(`${baseUrl}trending/movie/day?api_key=${api_key}`)

    if (!res.ok) {
        throw new Error("faild get data")
    }

    return await res.json()
}

export default async function Movies() {
    const data = await MovieDAta();
    const setLoading = () => {
        if (data) {
            return false
        }
    }



    return (
        <section id="movies">
            <div className="filter-wrapper">
                <button className="btn-filter">Populer</button>
                <button className="btn-filter">Rate</button>
                <button className="btn-filter active">Coming Soon</button>
                <button className="btn-filter">Playing Now</button>
            </div>

            <div className="movie-listing">
                {data && data.results.map((item: MovieType, i: number) => (
                    <CardMovie index={i} title={item.title} orientation="portrait" poster_path={item.poster_path} key={item.id} id={item.id} isLoading={setLoading()} />
                ))}
            </div>

            <ButtonBackToTop />
        </section>
    )
}
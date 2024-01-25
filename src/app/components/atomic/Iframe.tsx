"use client"
import { useGetVideoQuery } from "@/lib/redux/services/movies"
import { MovieType } from "./CardMovie"
import { useEffect, useState } from "react"
import { useGetVideoSeriesQuery } from "@/lib/redux/services/series"
const Iframe = (props: MovieType) => {
    const [videoKey, setVideoKey] = useState<string>("")
    const { data, isSuccess } = useGetVideoQuery(props.id)
    const { data: series, isSuccess: seriesSuccess } = useGetVideoSeriesQuery(props.id)
    const tvTrailer = seriesSuccess && series.results.find((item: any) => item.type === "Trailer")
    const trailer = isSuccess && data.results.find((item: any) => item.type === "Trailer")

    useEffect(() => {
        if (props.media_type === "tv") {
            tvTrailer && setVideoKey(tvTrailer.key)
        } else {
            trailer && setVideoKey(trailer.key)
        }
    }, [props, tvTrailer, trailer])

    return (
        <iframe src={`https://www.youtube.com/embed/${videoKey}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="Avengers Movie Trailer"></iframe>
    )
}

export default Iframe
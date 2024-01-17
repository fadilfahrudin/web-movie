"use client"
import { useGetVideoQuery } from "@/lib/redux/services/movies"
import { SeriesType } from "./CardMovie"
import { useEffect, useState } from "react"
import { useGetVideoSeriesQuery } from "@/lib/redux/services/series"
const Iframe = (props: SeriesType) => {
    const [videoKey, setVideoKey] = useState<string>("")
    const { data, isSuccess } = useGetVideoQuery(props.id)
    const { data: series, isSuccess: seriesSuccess } = useGetVideoSeriesQuery(props.id)
    const tvTrailer = seriesSuccess && series.results.find((item: any) => item.type === "Trailer")
    const trailer = isSuccess && data.results.find((item: any) => item.type === "Trailer")

    useEffect(() => {
        if (props.tv) {
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
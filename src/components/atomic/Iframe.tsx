"use client"
import { MovieType } from "../ListMovie"
import { useGetVideoQuery } from "@/lib/redux/services/movies"
const Iframe = (props: MovieType) => {
    const { data, isSuccess } = useGetVideoQuery(props.id)
    const trailer = isSuccess ? data.results.find((item: any) => item.type === "Trailer") : {}
    const { key } = trailer
    return (
        <iframe src={`https://www.youtube.com/embed/${key}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="Avengers Movie Trailer"></iframe>
    )
}

export default Iframe
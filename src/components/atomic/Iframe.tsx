"use client"
import { useGetVideoQuery } from "@/lib/redux/services/movies"
import { MovieType } from "./CardMovie"
import { useEffect, useState } from "react"
import { skipToken } from "@reduxjs/toolkit/query"


type playerVars = {
    autoplay?: 1 | 0,
    controls?: 1 | 0,
    rel?: number,
    showinfo?: number,
    mute?: 1 | 0,
    loop?: 1 | 0,
    modestbranding?: number,
    origin?: string
}
export interface IframeProps {
    id?: number,
    media_type?: "movie" | "tv",
    width?: string,
    height?: string,
    title?: string,
    videoKey?: string,
    playerVars: playerVars
}

const Iframe = (props: IframeProps) => {
    const { width, height, title, id, media_type, playerVars } = props;
    const { origin, controls, rel, showinfo, mute, loop, modestbranding, autoplay } = playerVars;
    const [videoKey, setVideoKey] = useState<string>("")
    const { data, isSuccess } = useGetVideoQuery({ id, media_type }, skipToken)
    const trailer = isSuccess && data.results.find((item: any) => item.type === "Trailer")
    useEffect(() => {
        trailer && setVideoKey(trailer.key)
    }, [setVideoKey, props, trailer])

    return (
        <iframe src={`https://www.youtube-nocookie.com/embed/${videoKey}?playlist=${videoKey}&controls=${controls}&autoplay=${autoplay ?? 1}&mute=${mute ?? 1}&loop=${loop ?? 1}&rel=${rel}&showinfo=${showinfo}&modestbranding=${modestbranding}&origin=${origin}`} width={width ?? "100%"} height={height ?? "100%"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={title}></iframe>
    )
}

export default Iframe
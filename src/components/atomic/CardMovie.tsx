/* eslint-disable @next/next/no-img-element */
"use client"
import { CSSProperties, useRef } from "react"
import { movieApi } from "@/config/api-config"
import { useRouter } from 'next/navigation'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useDispatch } from "react-redux";
import { setLoading } from "@/lib/redux/slice/loadingSlice";

export type MovieType = {
    id?: number,
    title?: string,
    name?: string,
    poster_path?: string,
    backdrop_path?: string,
    index?: number,
    orientation?: "landscape" | "portrait",
    isLoading?: boolean,
    isSuccess?: string
    media_type?: "tv" | "movie",
}

const CardMovie = (props: MovieType) => {
    const dispatch = useDispatch()
    const route = useRouter();
    const main = useRef<HTMLButtonElement | null>(null);
    const { thumb } = movieApi
    useGSAP(() => {
        const card = gsap.utils.toArray('.card-item-movie');
        card.forEach((item: any) => {
            gsap.fromTo(item, { opacity: 0 }, {
                opacity: 1,
                duration: 1,
                delay: props.index !== undefined ? props.index * 0.25 : 0,
            })
        })
    }, { scope: main })


    const styles: CSSProperties = {
        aspectRatio: props.orientation == "portrait" ? "2/3" : "16/9",
    }


    const handleClick = (e: any) => {
        e.preventDefault()
        if (props.media_type == "tv") {
            route.push(`/series/${props.id}`, { scroll: true })
        } else {
            route.push(`/movie/${props.id}`, { scroll: true })
        }
        dispatch(setLoading(true))
    }


    return (
        <button ref={main} type="button" className={`card-movie ${props.isLoading ? "loading" : ""} ${props.orientation == "landscape" ? "landscape" : ""}`} onClick={(e) => handleClick(e)}>
            <img src={props.orientation == "portrait" ? thumb(props.poster_path ?? "") : thumb(props.backdrop_path ?? "")} alt={props.media_type == "tv" ? props.name : props.title} className="card-item-movie" style={styles} width="1000" height="1000" />
        </button>
    )
}

export default CardMovie
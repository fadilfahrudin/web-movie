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
    poster_path?: string,
    backdrop_path?: string,
    index?: number,
    orientation?: "landscape" | "portrait",
    isLoading?: boolean,
    isSuccess?: string
}

export interface SeriesType extends MovieType {
    name?: string,
    tv?: boolean
}

const CardMovie = (props: SeriesType) => {
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
    const cardStyles: CSSProperties = {
        flexBasis: props.orientation == "portrait" ? "calc((100vw / 5) - 18px)" : "calc((100vw / 4) - 18px)",
        height: props.orientation == "portrait" ? "360px" : "200px",
    }

    const handleClick = () => {
        if (props.tv) {
            route.push(`/series/${props.id}`)
        } else {
            route.push(`/movie/${props.id}`)
        }
        dispatch(setLoading(true))

    }


    return (
        <button ref={main} style={cardStyles} type="button" className={`card-movie ${props.isLoading ? "loading" : ""}`} onClick={handleClick}>
            <img src={props.orientation == "portrait" ? thumb(props.poster_path ?? "") : thumb(props.backdrop_path ?? "")} alt={props.title} className="card-item-movie" style={styles} width="100%" height="100%" />
            <p className="card-title">{props.title}</p>
        </button>
    )
}

export default CardMovie
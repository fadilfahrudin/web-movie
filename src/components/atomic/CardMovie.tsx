/* eslint-disable @next/next/no-img-element */
"use client"
import { CSSProperties, useState, useRef } from "react"
import { movieApi } from "@/config/api-config"
import { useRouter } from 'next/navigation'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export type MovieType = {
    id?: number,
    title?: string,
    poster_path?: string,
    backdrop_path?: string,
    index?: number,
    orientation?: "landscape" | "portrait",
    isLoading?: boolean
}

const CardMovie = (props: MovieType) => {
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

    return (
        <button ref={main} type="button" className={`card-movie ${props.isLoading ? "loading" : ""}`} onClick={() => route.push(`/movie/${props.id}`)}>
            <img src={props.orientation == "portrait" ? thumb(props.poster_path ?? "") : thumb(props.backdrop_path ?? "")} alt={props.title} className="card-item-movie" style={styles} width="100%" height="100%" />
            <p className="card-title">{props.title}</p>
        </button>
    )
}

export default CardMovie
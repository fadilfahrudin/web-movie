/* eslint-disable @next/next/no-img-element */
"use client"
import { useGetVideoQuery } from "@/lib/redux/services/movies"
import { useGetVideoSeriesQuery } from "@/lib/redux/services/series"
import { setModal } from "@/lib/redux/slice/modalSlice"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MovieType } from "./CardMovie"
import YouTube from "react-youtube"
import { IcCLose } from "@/assets/icon"
import gsap from "gsap"

const ModalComponent = (props: MovieType) => {
    const playerRef = useRef<any | null>(null)
    const dispatch = useDispatch()
    const { isModal } = useSelector((state: any) => state.modal)
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

    const onReady = (e: any) => {
        playerRef.current = e.target
    }
    const option = {
        width: "100%",
        height: "200",
    }

    useEffect(() => {
        gsap.fromTo('.closeBtn', {
            y: 20,
            opacity: 0,
            duration: 2,
            rotate: 0,
            ease: "elastic.inOut"
        }, { y: 0, opacity: 1, duration: 2, ease: "elastic.inOut", rotate: 360 })

        gsap.fromTo('.modalBg',
            { opacity: 0 },
            { opacity: 0.5, ease: "elastic.inOut", duration: 1 }
        )
    })

    const handleClick = () => {
        gsap.to('.closeBtn', {
            y: 20,
            opacity: 0,
            duration: 1,
            rotate: 0,
            ease: "elastic.inOut"
        })
        gsap.to('.modalBg',
            { opacity: 0, duration: 1, ease: "elastic.inOut", delay: 0.5 }
        )
        setTimeout(() => {
            dispatch(setModal(false))
        }, 1000)
    }


    return isModal && (
        <div className="modal">
            <div className="modalBg"></div>
            <div className="videoWrapper">
                <button className="closeBtn" onClick={() => handleClick()}> <img src={IcCLose.src} alt="close video" width={20} height={20} /> </button>
                <YouTube className="videoModal" videoId={videoKey} opts={option} onReady={onReady} />
            </div>
        </div>
    )

}

export default ModalComponent
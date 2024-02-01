/* eslint-disable @next/next/no-img-element */
"use client"
import { setModal } from "@/lib/redux/slice/modalSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MovieType } from "./CardMovie"
import { IcCLose } from "@/assets/icon"
import gsap from "gsap"
import Iframe from "./Iframe"

const ModalComponent = (props: MovieType) => {
    const dispatch = useDispatch()
    const { isModal } = useSelector((state: any) => state.modal)
    useEffect(() => {
        if (window.innerWidth < 1366 && isModal) {
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
        }
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
                <Iframe id={props.id} media_type="movie" playerVars={{ origin: "http://localhost:3000", mute: 0 }} />
            </div>
        </div>
    )

}

export default ModalComponent
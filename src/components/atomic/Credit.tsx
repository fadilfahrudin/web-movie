/* eslint-disable @next/next/no-img-element */
"use client"
import { useGetCreditQuery } from "@/lib/redux/services/movies"
import { movieApi } from "@/config/api-config"
import { MovieType } from "./CardMovie"
import { useRef } from "react"
import { IcArrowLeft, IcArrowRight } from "@/assets/icon"

export type CastType = {
    id: number,
    cast_id: number,
    name: string,
    profile_path: string,
}

const Credit = (props: MovieType) => {
    const ref = useRef<HTMLDivElement>(null)
    const { thumb } = movieApi
    const { data, isSuccess } = useGetCreditQuery(props.id)

    const director = isSuccess && data.crew.find((item: any) => item.job == "Director")
    const writer = isSuccess && data.crew.filter((item: any) => item.department == "Writing")


    let uniqIdGender: any = [];
    let filGender = isSuccess && writer.filter((obj: any) => {
        if (!uniqIdGender.includes(obj.gender)) {
            uniqIdGender.push(obj.gender)
            return true
        }
        return false
    })

    const swipe = (direction: string) => {
        if (ref.current) {
            const { scrollLeft, clientWidth } = ref.current
            const scrollTo = direction === "left"
                ? scrollLeft - (clientWidth / 3)
                : scrollLeft + (clientWidth / 3)
            ref.current.scrollTo({ left: scrollTo, behavior: "smooth" })
        }
    }


    return (
        <div className="credit">
            <div className="cast-header">
                <h5>Actors</h5>
                {/* <div className="swipe">
                    <button onClick={() => swipe("left")}> <img src={IcArrowLeft.src} alt="arrow left" width={8} height={14} /></button>
                    <button onClick={() => swipe("right")}> <img src={IcArrowRight.src} alt="arrow right" width={8} height={14} /></button>
                </div> */}
            </div>
            <div className="cast" ref={ref}>
                {isSuccess && data.cast.slice(0, 4).map((cast: CastType) => (
                    <div key={cast.id} className="cast-info">
                        <img src={thumb(cast.profile_path)} alt={cast.name} width="100%" height="100%" />
                        <div className="cast-name">{cast.name}</div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Credit
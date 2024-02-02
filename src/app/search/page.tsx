/* eslint-disable @next/next/no-img-element */
"use client"
import { CSSProperties, useEffect, useState, useRef } from "react"
import ListMovie from "../../components/molecules/ListMovie"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "@/lib/redux/slice/loadingSlice"
import { useGetSeriesByIdQuery } from "@/lib/redux/services/series"
import { movieApi } from "@/config/api-config"
import SearchComponent from "../../components/atomic/Search"
import { useGetBySearchQuery } from "@/lib/redux/services/movies"
import gsap from "gsap"
import Loading from "@/app/loading"
import LoadPage from "@/components/atomic/LoadPage"

export default function Search() {
    const { data, isLoading: loadSeries, isSuccess } = useGetSeriesByIdQuery(95479)
    const { data: query, isSuccess: querySuccess } = useGetBySearchQuery("jujutsu kaisen")
    const { title } = isSuccess && data
    const { originalImg } = movieApi
    const { isLoading } = useSelector((state: any) => state.loading)
    const dispatch = useDispatch()
    const [search, setSearch] = useState("")
    const onSubmit = (e: any) => {
        e.preventDefault()
        setSearch(e.target[0].value)
    }

    useEffect(() => {
        let mm = gsap.matchMedia()
        setTimeout(() => {
            mm.add("(max-width: 767px)", () => {
                gsap.set(".search-bg-overlay", {
                    width: "100%",
                    height: search == "" ? "100vh" : "26vh",
                    transform: "translateY(16px)",
                })
                gsap.set(".searh-img-bg", {
                    width: "100%",
                    height: search == "" ? "100vh" : "26vh",
                    transform: "translateY(16px)",
                })
            })
        }, 3000)
    })

    // Animat style
    const imgBg: CSSProperties = {
        width: search == "" ? "80%" : "100%",
        height: search == "" ? "80vh" : "30vh",
        transform: search == "" ? "translateY(16px)" : "translateY(-100px)",
    }
    const overlayBg: CSSProperties = {
        width: search == "" ? "80%" : "100%",
        height: search == "" ? "80vh" : "30vh",
        transform: search == "" ? "translateY(16px)" : "translateY(-100px)",
    }

    const ref = useRef<HTMLDivElement>(null)

    return (
        <>
            <LoadPage />
            {isLoading ? <Loading /> :
                <div id="search-page" >
                    <div className="search-bg-overlay" style={overlayBg}></div>

                    <div ref={ref} className="searh-img-bg" style={imgBg}>
                        {querySuccess && query.results.map((item: any) => (
                            <img key={item.id} src={originalImg(item.backdrop_path)} alt={title} width="100%" height="100%" />
                        ))}
                    </div>
                    <SearchComponent search={search} onSubmit={(e) => onSubmit(e)} />
                    {search == "" ? "" :
                        <ListMovie listTitle="Search Result" imgOrientation="portrait" listType="movies" listPath="query" keyword={search} />
                    }

                </div>
            }
        </>
    )
}
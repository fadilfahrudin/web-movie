/* eslint-disable @next/next/no-img-element */
"use client"
import { CSSProperties, useEffect, useState, useRef } from "react"
import ListMovie from "../components/molecules/ListMovie"
import { useDispatch, useSelector } from "react-redux"
import LoadPage from "../components/atomic/LoadPage"
import { setLoading } from "@/lib/redux/slice/loadingSlice"
import { useGetSeriesByIdQuery } from "@/lib/redux/services/series"
import { movieApi } from "@/config/api-config"
import SearchComponent from "../components/atomic/Search"
import AnimatedComponent from "./animation"

export default function Search() {
    const { data, isLoading: loadSeries, isSuccess } = useGetSeriesByIdQuery(95479)
    const { poster_path, title } = isSuccess && data
    const { originalImg } = movieApi
    const { isLoading } = useSelector((state: any) => state.loading)
    const dispatch = useDispatch()
    const [search, setSearch] = useState("")
    const onSubmit = (e: any) => {
        e.preventDefault()
        setSearch(e.target[0].value)
    }


    useEffect(() => {
        if (loadSeries) {
            dispatch(setLoading(true))
        } else if (isSuccess) {
            dispatch(setLoading(false))
        }
    }, [isLoading, dispatch, loadSeries, isSuccess])

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


    return (
        <>
            {isLoading && <LoadPage />}
            {!isLoading &&
                <div id="search-page" >
                    <div className="search-bg-overlay" style={overlayBg}></div>
                    <div className="searh-img-bg" style={imgBg}>
                        <img src={originalImg(poster_path)} alt={title} width="100%" height="100%" />
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
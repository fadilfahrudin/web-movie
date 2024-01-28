"use client"

import { setMoviePath, setPage } from "@/lib/redux/slice/movieSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { setSeriesPath } from "@/lib/redux/slice/seriesSlice"
const ButtonFilter = ({ pathName, nameBtn, series }: { pathName: string, nameBtn: string, series?: boolean }) => {
    const { moviePath } = useSelector((state: any) => state.movie)
    const { seriesPath } = useSelector((state: any) => state.series)
    const dispatch = useDispatch();
    const [active, setActive] = useState(false)

    const handleClick = () => {
        if (series) {
            dispatch(setSeriesPath(pathName))
        } else {
            dispatch(setMoviePath(pathName))
        }
        dispatch(setPage(1))
    }

    useEffect(() => {
        if (series) {
            if (seriesPath == pathName) {
                setActive(true)
            } else {
                setActive(false)
            }

        } else if (!series) {
            if (moviePath == pathName) {
                setActive(true)
            } else {
                setActive(false)
            }
        }
    }, [moviePath, pathName, seriesPath, series])

    return (
        <button className={`btn-filter ${active ? 'active' : ''}`} onClick={handleClick}>{nameBtn}</button>
    )
}

export default ButtonFilter
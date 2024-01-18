"use client"

import { CSSProperties, useEffect, useState } from "react"
import ListMovie from "../components/molecules/ListMovie"
import { useDispatch, useSelector } from "react-redux"
import LoadPage from "../components/atomic/LoadPage"
import { setLoading } from "@/lib/redux/slice/loadingSlice"


export default function Search() {
    const { isLoading } = useSelector((state: any) => state.loading)
    const dispatch = useDispatch()
    const [search, setSearch] = useState("")
    const onSubmit = (e: any) => {
        e.preventDefault()
        setSearch(e.target[0].value)
    }

    const styles: CSSProperties = {
        transform: search == "" ? "translateY(200px) scale(1.1)" : "translateY(0px) scale(1)",
    }

    useEffect(() => {
        if (isLoading) {
            dispatch(setLoading(false))
        }
    })

    return (
        <>
            {isLoading && <LoadPage />}
            <div id="search-page" >
                <form onSubmit={(e) => onSubmit(e)} className="search-form" style={styles}  >
                    <input type="text" placeholder="Search..." />
                    <button type="submit" className="btn-search">Search</button>
                </form>
                {search == "" ? "" :
                    <ListMovie listTitle="Search Result" imgOrientation="portrait" listType="movies" listPath="query" keyword={search} />
                }
            </div>
        </>
    )
}
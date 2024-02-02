"use client"
import { setLoading } from "@/lib/redux/slice/loadingSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const LoadPage = () => {
    const { isLoading } = useSelector((state: any) => state.loading)
    const dispatch = useDispatch()
    useEffect(() => {
        if (isLoading) {
            setTimeout(() => {
                dispatch(setLoading(false))
            }, 3000)
        }
    }, [dispatch, isLoading])
    return (
        <>
            {isLoading &&
                <div className="loadPage">
                    <div className="loader">
                        <p>Please Wait</p>
                        <div className="dot-wrapper">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default LoadPage
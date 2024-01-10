'use client'
import styles from '@/app/page.module.css'
import { omdbapi } from "@/app/action"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

let page = 2;

const Loading = () => {

    const { ref, inView } = useInView()
    const [data, setData] = useState<any>([])

    useEffect(() => {
        if (inView && page < 4) {
            omdbapi(page)
                .then((res) => {
                    setData([...data, ...res])
                    page++;
                });
        }
    }, [inView, data])

    const style = {
        color: 'white',
        fontSize: '24px',
        marginTop: '20px'
    }

    return (
        <>
            <ul className={styles.movies} >
                {data}
            </ul>
            <p ref={ref} style={style}>Loading...</p>
        </>
    )
}

export default Loading
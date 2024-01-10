/* eslint-disable @next/next/no-img-element */
"use client"
import { toTop } from "@/assets/icon"
function ButtonBackToTop() {
    const backToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    return (
        <button className="btn-to-top" aria-label="back to top" onClick={backToTop}>
            <img src={toTop.src} alt="back to top" width="100%" height="100%" />
        </button>
    )
}

export default ButtonBackToTop
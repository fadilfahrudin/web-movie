"use client"
import Lenis from '@studio-freight/lenis'
const lenis: Lenis = new Lenis()
lenis.on('scroll', (e: any) => {
    console.log(e)
})

function raf(time: any) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

export const LenisComponent = ({ children }: { children: React.ReactNode }) => {
    requestAnimationFrame(raf)
    return (
        <>{children}</>
    )
}
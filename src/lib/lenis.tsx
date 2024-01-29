"use client"
import { ReactLenis } from '@studio-freight/react-lenis'

export default function LenisComponent({ children }: { readonly children: React.ReactNode }) {
    return (
        <ReactLenis root options={{ smooth: true, lerp: 0.1, duration: 1.5, }}>{children}</ReactLenis>
    )
}
import { useEffect } from 'react';
import gsap from 'gsap';

const AnimatedComponent = () => {
    useEffect(() => {
        // Animasi GSAP di sini
        const tl = gsap.timeline();
        tl.to('.animated-element', { y: -50, duration: 1, ease: "bounce" });
    }, []);

    return (
        <div className="animated-element" style={{ color: 'white', position: 'absolute', zIndex: 9999, top: '7rem', left: 0 }}>
            {/* Konten animasi di sini */}
            Animasi akan dijalankan saat komponen di-render.
        </div>
    );
};

export default AnimatedComponent;
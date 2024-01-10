/* eslint-disable @next/next/no-img-element */
"use client"
import { Logo } from '@/assets/img';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ButtonBackToTop from '../atomic/ButtonBackToTop';
export const Navbar = () => {
    const pathname = usePathname();
    return (
        <>
            <nav className='desktop-navigation'>
                <a className="brand" href='/'><img src={Logo.src} alt="Fadils Movie" width={35} height={35} /> MOVIES</a>
                <ul>
                    <li><Link href="/" className={pathname === '/' ? 'active' : ''}>Home</Link></li>
                    <li><Link href="/movies" className={pathname === '/movies' ? 'active' : ''}>Movies</Link></li>
                    <li><Link href="/series" className={pathname === '/series' ? 'active' : ''}>Series</Link></li>
                    <li><Link href="/search" className='search'><i className='ic-search'></i>Search</Link></li>
                </ul>
                <a href="#about" className="about">ABOUT</a>

            </nav>
            <nav className="mobile-navigation">
                <ul>
                    <li><Link href="/" className={pathname === '/' ? 'active' : ''}><img src={Logo.src} alt="Fadils Movie" width={35} height={35} /></Link></li>
                    <li><Link href="/movies" className={pathname === '/movies' ? 'active' : ''}>Movies</Link></li>
                    <li><Link href="/series" className={pathname === '/series' ? 'active' : ''}>Series</Link></li>
                    <li><Link href="#about" className='about'>About</Link></li>
                    <li><Link href="/search" className='search'><i className='ic-search'></i></Link></li>
                </ul>
                <ButtonBackToTop />
            </nav>
        </>
    )
}

export default Navbar;
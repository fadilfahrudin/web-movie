/* eslint-disable @next/next/no-img-element */
"use client"
import { Logo } from '@/assets/img';
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import ButtonBackToTop from '../atomic/ButtonBackToTop';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/lib/redux/slice/loadingSlice';
export const Navbar = () => {
    const route = useRouter();
    const dispatch = useDispatch()
    const pathname = usePathname();

    const handleClick = (path: string) => {
        if (path == '/') {
            dispatch(setLoading(false))
        } else {
            dispatch(setLoading(true))
        }
        route.push(path)
    }
    return (
        <>
            <nav className='desktop-navigation'>
                <a className="brand" href='/'><img src={Logo.src} alt="Fadils Movie" width={35} height={35} /> MOVIES</a>
                <ul>
                    <li><button className={pathname === '/' ? 'active' : ''} onClick={() => handleClick('/')}>Home</button></li>
                    <li><button className={pathname === '/movies' ? 'active' : ''} onClick={() => handleClick('/movies')}>Movies</button></li>
                    <li><button className={pathname === '/series' ? 'active' : ''} onClick={() => handleClick('/series')}>Series</button></li>
                    <li><button className='search' onClick={() => handleClick('/search')}><i className='ic-search' ></i>Search</button></li>
                </ul>
                <a href='#about' className="about">ABOUT</a>

            </nav>
            <nav className="mobile-navigation">
                <ul>
                    <li><button className={pathname === '/' ? 'active' : ''}><img src={Logo.src} alt="Fadils Movie" width={35} height={35} /></button></li>
                    <li><button className={pathname === '/movies' ? 'active' : ''}>Movies</button></li>
                    <li><button className={pathname === '/series' ? 'active' : ''}>Series</button></li>
                    <li><button className='about'>About</button></li>
                    <li><button className='search'><i className='ic-search'></i></button></li>
                </ul>
                <ButtonBackToTop />
            </nav>
        </>
    )
}

export default Navbar;
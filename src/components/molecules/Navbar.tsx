/* eslint-disable @next/next/no-img-element */
"use client"
import { Logo, logoDark } from '@/assets/img';
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
        dispatch(setLoading(true))
        route.push(path)
    }
    return (
        <>
            <nav className='desktop-navigation'>
                <a className="brand" href='/'><img src={Logo.src} alt="Fadils Movie" width={35} height={35} /> MOVIES</a>
                <ul>
                    <li><a role='button' className={pathname === '/' ? 'active' : ''} onClick={() => handleClick('/')}>Home</a></li>
                    <li><a role='button' className={pathname === '/movies' ? 'active' : ''} onClick={() => handleClick('/movies')}>Movies</a></li>
                    <li><a role='button' className={pathname === '/series' ? 'active' : ''} onClick={() => handleClick('/series')}>Series</a></li>
                    <li><a role='button' className='search' onClick={() => handleClick('/search')}><i className='ic-search' ></i>Search</a></li>
                </ul>
                <a href='https://fadilfahrudin.com' target='_blank' className="about">ABOUT</a>

            </nav>
            <nav className="mobile-navigation">
                <ul>
                    <li><a role='button' className={pathname === '/' ? 'active' : ''} onClick={() => handleClick('/')}><img src={logoDark.src} alt="Fadils Movie" width={30} height={30} /></a></li>
                    <li><a role='button' className={pathname === '/movies' ? 'active' : ''} onClick={() => handleClick('/movies')}>Movies</a></li>
                    <li><a role='button' className={pathname === '/series' ? 'active' : ''} onClick={() => handleClick('/series')}>Series</a></li>
                    <li><a role='button' className='about' href='https://fadilfahrudin.com' target='_blank'>About</a></li>
                    <li><a role='button' className='search' onClick={() => handleClick('/search')}><i className='ic-search'></i></a></li>
                </ul>
                <ButtonBackToTop />
            </nav>
        </>
    )
}

export default Navbar;
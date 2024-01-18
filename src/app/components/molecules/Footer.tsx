/* eslint-disable @next/next/no-img-element */

import { logoBehance, logoDribbble, logoGithub, logoIg, logoLinkedIn, logoYoutube } from "@/assets/img"
import { movieApi } from "@/config/api-config";
import Image from "next/image"

export async function fetchFooter() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const result = await fetch(`${movieApi.baseUrl}search/multi?query=marvel&page=1&include_adult=false&language=en-US&api_key=${movieApi.api_key}`);
    return result.json();
}

const Footer = async () => {
    const { thumb } = movieApi
    const data = await fetchFooter();

    return (
        <footer>
            <ul className="list-img-footer">
                {data && data.results.map((item: any, i: number) => (
                    <li key={i}><img src={thumb(item.poster_path)} alt={item.name} width="100%" height="100%" /></li>
                ))}
            </ul>
            <div className="footer-info">
                <ul>
                    <label>Tech Stacks</label>
                    <li>Typescript</li>
                    <li>NextJS</li>
                    <li>SCSS</li>
                    <li>Redux Toolkit</li>
                    <li>GSAP</li>
                </ul>
                <ul>
                    <label>Design UI Refrence</label>
                    <li><a href="https://dribbble.com/shots/6867582-Movie-App-Interaction" target="_blank" rel="noreferrer">Dorian Colin</a></li>
                    <li><a href="https://dribbble.com/shots/19362738-Movie-Hub-App-Elvis-the-movie-promo-page" target="_blank" rel="noreferrer">Edin Baljic ⚡️</a></li>
                </ul>
                <ul>
                    <label>Source Data</label>
                    <li><a href='https://www.themoviedb.org/' target='_blank' rel='noreferrer'>The Movie DB</a></li>
                </ul>
            </div>

            <div className="license">
                <div className="about">
                    <span className="say-hello">Hi There</span>  👋<br />
                    Feel free to contact me if you want to collaborate or just be friendly. <a href="mailto:fadilfahrudin32@gmail.com">fadilfahrudin32@gmail.com</a></div>
                <div className="social-media-wrapp">
                    <a
                        href='https://dribbble.com/fadilfahrudin'
                        target='_blank'
                        rel='noreferrer'>
                        <Image src={logoDribbble} alt='icon' className='logo' width={40} height={40} />
                    </a>
                    <a
                        href='https://www.behance.net/fadilfahrudin'
                        target='_blank'
                        rel='noreferrer'>
                        <Image src={logoBehance} alt='icon' className='logo' width={40} height={40} />
                    </a>
                    <a href='https://github.com/fadilfahrudin' target='_blank' rel='noreferrer'>
                        <Image src={logoGithub} alt='icon' className='logo' width={40} height={40} />
                    </a>
                    <a
                        href='https://www.instagram.com/fadilfahrudin/'
                        target='_blank'
                        rel='noreferrer'>
                        <Image src={logoIg} alt='icon' className='logo' width={40} height={40} />
                    </a>
                    <a
                        href='https://www.linkedin.com/in/fadillahfahrudin'
                        target='_blank'
                        rel='noreferrer'>
                        <Image src={logoLinkedIn} alt='icon' className='logo' width={40} height={40} />
                    </a>
                    <a
                        href='https://www.youtube.com/@fadilfahrudin3807'
                        target='_blank'
                        rel='noreferrer'>
                        <Image src={logoYoutube} alt='icon' className='logo' width={40} height={40} />
                    </a>
                </div>
            </div>

            <div className="copyright">© 2024 <b>Fadil Fahrudin</b> - Made with a cup of ☕ </div>
        </footer>
    )
}

export default Footer
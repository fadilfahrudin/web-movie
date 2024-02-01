/* eslint-disable @next/next/no-img-element */
import Iframe from "@/components/atomic/Iframe";
import SeasonsComponent from "@/components/atomic/SeasonsComponent";
import { movieApi } from "@/config/api-config";
import { Suspense } from "react";
import Loading from "@/app/loading";

async function getSeriesById(id: number) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const result = await fetch(`${movieApi.baseUrl}tv/${id}?api_key=${movieApi.api_key}`);
    return result.json();
}

export default async function DetailSeries({ params: { slug } }: { params: { slug: number } }) {
    const data = await getSeriesById(slug);
    const { originalImg } = movieApi
    const { backdrop_path, genres, name, poster_path, overview, number_of_seasons, number_of_episodes, vote_average } = data
    return (
        <>
            <Suspense fallback={<Loading />}>
                <div id="detail-series">
                    <header className="header-series">
                        <div className="overlay-backdrop-series"></div>
                        <div className="backdrop-series">
                            <img src={originalImg(backdrop_path)} alt={name} width="100%" height="100%" />
                        </div>
                        <div className="poster-series ">
                            <img src={originalImg(poster_path)} alt={name} width="100%" height="100%" />
                        </div>
                        <div className="info-series">
                            <ul className="list-info">
                                <li>{number_of_episodes} Episode</li>
                                <li>{number_of_seasons} Seasons</li>
                                <li>Rate {Math.round(vote_average * 10) / 10}</li>
                            </ul>
                            <div className="series-title">{name}</div>
                            <div className="genres-series">
                                {genres.map((item: any) => item.name).join(' | ')}
                            </div>
                            <div className="overview-series">
                                {overview}
                            </div>
                            <div className="series-video">
                                <Iframe media_type={"tv"} id={slug} playerVars={{ autoplay: 0, mute: 0 }} />
                            </div>
                        </div>
                    </header>

                    <div className="more-series">
                        <h2>Seasons and Episodes</h2>
                        <SeasonsComponent id={slug} number_of_seasons={number_of_seasons} />
                    </div>
                </div>
            </Suspense>
        </>
    )
}

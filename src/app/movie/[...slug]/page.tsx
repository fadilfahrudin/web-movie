/* eslint-disable @next/next/no-img-element */
import Iframe from "@/app/components/atomic/Iframe";
import { movieApi } from "@/config/api-config";
import Credit from "@/app/components/atomic/Credit";
import ListMovie from "@/app/components/molecules/ListMovie";
import { Suspense } from "react";
import Loading from "@/app/movie/[...slug]/loading";
import { IcPlay } from "@/assets/icon";

async function FetchMovieById(id: number) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const result = await fetch(`${movieApi.baseUrl}movie/${id}?api_key=${movieApi.api_key}`);
    return result.json();
}

export default async function DetailMovie({ params }: { readonly params: { slug: number } }) {
    const { originalImg } = movieApi
    const data = await FetchMovieById(params.slug);
    const { title, overview, genres, release_date, poster_path, vote_average, backdrop_path, belongs_to_collection, runtime } = data;
    return (
        <Suspense fallback={<Loading />}>
            <main id="detail-page">
                <header>
                    <div className="backdrop">
                        <img src={originalImg(backdrop_path)} alt={title} width="100%" height="100%" />
                    </div>
                    <button className="btn-play" type="button">
                        <img src={IcPlay.src} alt="Play" width={50} height={50} />
                    </button>
                    <div className="detail-movie">
                        <div className="title">{title}</div>
                        <div className="release-gendres">{release_date.split('-')[0]} | {genres.map((item: any) => item.name).join(', ')} | {runtime} minutes</div>
                        <div className="overview">{overview}</div>
                    </div>
                    <div className="original-poster">
                        <img src={originalImg(poster_path)} alt={title} width="100%" height="100%" />
                    </div>
                    <Credit id={params.slug} />
                </header>
                <Credit id={params.slug} />
                <section className="overviewMobile"><b>Description</b>: <br /> {overview}</section>

                <section className="movieVideo">
                    <Iframe id={params.slug} />
                </section>
                <section className="additional">
                    {belongs_to_collection ? <ListMovie listTitle="Sequel" imgOrientation="landscape" listType="featured" listPath="sequel" collectionId={belongs_to_collection?.id} movieId={params.slug} /> : ""}
                    <ListMovie listTitle="Playing Now" imgOrientation="portrait" listType="featured" listPath="playingNow" collectionId={belongs_to_collection?.id} movieId={params.slug} />
                </section>
            </main>
        </Suspense >
    )

}
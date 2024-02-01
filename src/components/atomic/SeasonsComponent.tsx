/* eslint-disable @next/next/no-img-element */
"use client"
import { useEffect, useState } from "react"
import { useGetTvSeasonsQuery } from "@/lib/redux/services/series"
import { movieApi } from "@/config/api-config"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "@/lib/redux/slice/loadingSlice"

export type SeasonType = {
    id?: number
    name?: string,
    overview?: string,
    still_path?: string,
    number_of_seasons?: number,
    season_number?: number,
    episode_number?: number
}

const SeasonsComponent = (props: SeasonType) => {
    const { isLoading } = useSelector((state: any) => state.loading)
    const dispatch = useDispatch()
    const { thumb } = movieApi
    const { id, number_of_seasons } = props
    const seriesId = id?.toString()
    const [season, setSeason] = useState(1)


    const { data, isSuccess } = useGetTvSeasonsQuery({ id: seriesId, season_number: season })
    const handleOnChange = (e: any) => {
        setSeason(e.target.value)
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(setLoading(false))
        }
    }, [isSuccess, dispatch])

    const optionRender = () => {
        if (number_of_seasons !== undefined) {
            const options = [];
            for (let i = 1; i <= number_of_seasons; i++) {
                options.push(<option key={i} className="opt-season" value={i}>{i}</option>)
            }
            return options;
        }
    }

    return (
        <div className="seasons-wrapper">
            <div className="select-wrapper">
                <label htmlFor="season">Season</label>
                <select name="season" onChange={handleOnChange} id="season" className="seasons-select">
                    {optionRender()}
                </select>
            </div>
            <div className="episode-wrapper">
                {isLoading ? <p>Loading</p>
                    :
                    data?.episodes.map((episode: SeasonType) => (
                        <div className="episode" key={episode.id}>
                            <div className={`thumb-episode ${isLoading ? "loading" : ""}`}>
                                <img src={thumb(episode.still_path ?? "")} alt={episode.name} width="100" height="100" />
                            </div>
                            <div className="episode-info">
                                <h3 className={`episode-title ${isLoading ? "loading" : ""}`}>{episode.name}</h3>
                                <p className={`episode-overview ${isLoading ? "loading" : ""}`}>{episode.overview}</p>
                                <p className={`episode-number ${isLoading ? "loading" : ""}`}>Episode {episode.episode_number}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SeasonsComponent
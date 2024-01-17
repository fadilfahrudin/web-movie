/* eslint-disable @next/next/no-img-element */
"use client"
import { useGetCreditQuery } from "@/lib/redux/services/movies"
import { movieApi } from "@/config/api-config"
import { MovieType } from "./CardMovie"

export type CastType = {
    id: number,
    cast_id: number,
    name: string,
    profile_path: string,
}

const Credit = (props: MovieType) => {
    const { thumb } = movieApi
    const { data, isSuccess } = useGetCreditQuery(props.id)

    const director = isSuccess && data.crew.find((item: any) => item.job == "Director")
    const writer = isSuccess && data.crew.filter((item: any) => item.department == "Writing")


    let uniqIdGender: any = [];
    let filGender = isSuccess && writer.filter((obj: any) => {
        if (!uniqIdGender.includes(obj.gender)) {
            uniqIdGender.push(obj.gender)
            return true
        }
        return false
    })



    return (
        <div className="cast">
            {isSuccess && data.cast.slice(0, 4).map((cast: CastType) => (
                <div key={cast.id} className="cast-info">
                    <img src={thumb(cast.profile_path)} alt={cast.name} width="100%" height="100%" />
                    <div className="cast-name">{cast.name}</div>
                </div>
            ))}

            <div className="director-writer">
                <div className="director">
                    <div className="director-title">Director</div>
                    <div className="director-name">{director.name}</div>
                </div>
                <div className="writer">
                    <div className="writer-title">Writer</div>
                    <ul className="writer-list">
                        {isSuccess && filGender.map((item: any) => (
                            <li key={item.id}>{item.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Credit
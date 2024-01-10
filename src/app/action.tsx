"use server"
import MovieCard from '@/components/atomic/_MovieCard';
import { movieApi } from '@/config/api-config'

export async function omdbapi(page: number) {
    const res = await fetch(`${movieApi.baseUrl}trending/movie/day?api_key=${movieApi.api_key}`)
    if (!res) {
        throw new Error('Failed to fetch data')
    }
    const data = await res.json()
    return data.results.map((item: any, i: number) => (
        <MovieCard index={i} key={item.id} poster_path={movieApi.thumb(item.poster_path || "")} />
    ))
}
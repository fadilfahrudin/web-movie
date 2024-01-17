
// import CardMovie from '@/components/atomic/CardMovie';
// import { movieApi } from '@/config/api-config'
// // import { GetData } from '@/components/atomic/loading';

// export const getMovies = async (page: number, path: string) => {
//     const { api_key, baseUrl } = movieApi
//     const res = await fetch(`${baseUrl}movie/${path}?api_key=${api_key}&page=${page || 1}&language=en-US`)
//     if (!res) {
//         throw new Error('Failed to fetch data')
//     }
//     const data = await res.json()
//     return data.results.map((item: any, i: number) => (
//         <CardMovie title={item.title} orientation="portrait" id={item.id} index={i} key={item.id} poster_path={item.poster_path ?? ""} backdrop_path={item.backdrop_path ?? ""} />
//     ))
// }
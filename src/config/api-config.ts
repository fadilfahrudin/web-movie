export const movieApi = {
    baseUrl: "https://api.themoviedb.org/3/",
    api_key: "b8903b791ab75fc18a3ec0b368f333b2",
    thumb: (image: string) => `https://image.tmdb.org/t/p/w500/${image}`,
    originalImg: (image: string) => `https://image.tmdb.org/t/p/original/${image}`
}
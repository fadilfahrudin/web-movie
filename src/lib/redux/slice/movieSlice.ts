import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface MovieState {
    movies: [],
    currentPage: number,
    totalPage: number,
    moviePath: string,
    movieType: "featured" | "list",
    poster: "portrait" | "landscape"
}

const initialState: MovieState = {
    movies: [],
    currentPage: 1,
    totalPage: 1,
    moviePath: 'popular',
    movieType: "list",
    poster: "portrait"
}

export const movieSlice: any = createSlice({
    name: "movie",
    initialState,
    reducers: {
        setMoviePath: (state, action: PayloadAction<string>) => {
            state.moviePath = action.payload
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setMovies: (state: any, action) => {
            state.movies = action.payload
        }
    }
})

export const { setMoviePath, setPage, setMovies } = movieSlice.actions

export default movieSlice.reducer
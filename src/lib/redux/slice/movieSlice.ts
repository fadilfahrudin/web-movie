import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface MovieState {
    orientation: "portrait" | "landscape",
    listType: "movies" | "featured",
    isLoading: boolean
}

const initialState: MovieState = {
    isLoading: true,
    orientation: "portrait",
    listType: "movies",
}

export const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = false
        },
        setOrientation: (state, action: PayloadAction<"portrait" | "landscape">) => {
            state.orientation = action.payload
        },
        setListType: (state, action: PayloadAction<"movies" | "featured">) => {
            state.listType = action.payload
        }
    }
})

export const { setListType, setLoading, setOrientation } = movieSlice.actions

export default movieSlice.reducer
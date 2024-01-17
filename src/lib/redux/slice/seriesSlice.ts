import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface SeriesState {
    series: [],
    currentPage: number,
    totalPage: number,
    seriesPath: string,
    seriesType: "featured" | "list",
    poster: "portrait" | "landscape"
}

const initialState: SeriesState = {
    series: [],
    currentPage: 1,
    totalPage: 1,
    seriesPath: 'popular',
    seriesType: "list",
    poster: "portrait"
}

export const seriesSlice: any = createSlice({
    name: "series",
    initialState,
    reducers: {
        setSeriesPath: (state, action: PayloadAction<string>) => {
            state.seriesPath = action.payload
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setSeries: (state: any, action) => {
            state.series = action.payload
        }
    }
})

export const { setSeriesPath, setPage, setSeries } = seriesSlice.actions

export default seriesSlice.reducer
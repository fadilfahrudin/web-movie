import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';

import { moviesApi } from '@/lib/redux/services/movies';
import { seriesApi } from '@/lib/redux/services/series'
import movieSlice from "./slice/movieSlice";
import seriesSlice from "./slice/seriesSlice";
import loadingSlice from "./slice/loadingSlice";
import modalSlice from "./slice/modalSlice";

export const store = configureStore({
    reducer: {
        [moviesApi.reducerPath]: moviesApi.reducer,
        [seriesApi.reducerPath]: seriesApi.reducer,
        movie: movieSlice,
        series: seriesSlice,
        loading: loadingSlice,
        modal: modalSlice
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(moviesApi.middleware).concat(seriesApi.middleware),
})

// store.subscribe(() => console.log(store.getState().movie))
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
setupListeners(store.dispatch)
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';

import { moviesApi } from '@/lib/redux/services/movies';
import movieSlice from "./slice/movieSlice";

export const store = configureStore({
    reducer: {
        [moviesApi.reducerPath]: moviesApi.reducer,
        movie: movieSlice
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(moviesApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
setupListeners(store.dispatch)
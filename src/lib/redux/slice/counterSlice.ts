import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export const counterSlice = createSlice({
    name: "counter",
    initialState: { counter: 0 },
    reducers: {
        increment: (state) => {
            state.counter++
        },
        decrement: (state) => {
            state.counter--
        }
    }
})

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer
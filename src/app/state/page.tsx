"use client"

import { decrement, increment } from "@/lib/redux/slice/counterSlice";
import { useSelector, useDispatch } from "react-redux";

const State = () => {
    const dispatch = useDispatch()
    const { counter } = useSelector((state: any) => state.counter)
    return (
        <>
            <button onClick={() => dispatch(increment())}>+</button>
            {counter}
            <button onClick={() => dispatch(decrement())}>-</button>
        </>
    )
}

export default State;
"use client"

import { setModal } from "@/lib/redux/slice/modalSlice"
import { useDispatch, useSelector } from "react-redux"
interface ButtonProps {
    children: React.ReactNode,
}

const Button: React.FC<ButtonProps> = ({ children }) => {
    const { isModal } = useSelector((state: any) => state.modal)
    const dispatch = useDispatch()
    const handleCLick = () => {
        dispatch(setModal(!isModal))
    }
    return (
        <button onClick={handleCLick} className="btn-play" type="button">
            {children}
        </button>
    )
}

export default Button
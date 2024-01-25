import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ModalState {
    isModal: boolean
}
const initialState: ModalState = {
    isModal: false
}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setModal: (state, action: PayloadAction<boolean>) => {
            state.isModal = action.payload
        }
    }
})

export const { setModal } = modalSlice.actions;
export default modalSlice.reducer;
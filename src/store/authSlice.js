import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: localStorage.getItem("authStatus"),
    userData: null

}



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {


            state.status = true,

                localStorage.setItem("authStatus", state.status)
            state.userData = action.payload

        },
        logout: (state) => {
            state.status = false,
                localStorage.setItem("authStatus", state.status)
            state.userData = null

        }

    }
})

export const { logout, login } = authSlice.actions;
export default authSlice;
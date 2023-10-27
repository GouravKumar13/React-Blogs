import { createSlice } from "@reduxjs/toolkit";

let authStatus = localStorage.getItem("authStatus")
if (!authStatus) {
    authStatus = false
}

let userData = localStorage.getItem("userData")

if (!userData) {
    userData = null

}

const initialState = {
    status: authStatus,
    userData: userData

}



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {

            state.status = true,
                state.userData = action.payload
            localStorage.setItem("authStatus", state.status)
            localStorage.setItem("userData", JSON.stringify(action.payload))

        },
        logout: (state) => {
            state.status = false,
                state.userData = null
            localStorage.clear()

        }

    }
})

export const { logout, login } = authSlice.actions;
export default authSlice;
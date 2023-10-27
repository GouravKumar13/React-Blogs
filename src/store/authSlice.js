import { createSlice } from "@reduxjs/toolkit";
let status = localStorage.getItem("authStatus")
if (!status) {
    status = false
}

let userData = localStorage.getItem("userData")

if (!userData) {
    userData = null

}
const initialState = {
    status: status,
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
            localStorage.setItem("userData", action.payload)

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
import { createSlice } from "@reduxjs/toolkit";
const data = localStorage.getItem("userData")
const initialState = {
    status: localStorage.getItem("status") || false,
    userData: JSON.parse(data) || null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true
            state.userData = action.payload
            localStorage.setItem("status", true)
            localStorage.setItem("userData", JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.status = false
            localStorage.setItem("status", false)
            localStorage.setItem("userData", null)
        }
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
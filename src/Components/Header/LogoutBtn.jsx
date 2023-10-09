import React from 'react'
import { logout } from "../../store/authSlice"
import authService from "../../appWrite/auth"
import { useDispatch } from 'react-redux'

const LogoutBtn = () => {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout()
            .then(() => { dispatch(logout()) })
            .catch((error) => console.log(error))
    }
    return (
        <button onClick={ logoutHandler }>
            LogOut
        </button>
    )
}

export default LogoutBtn

import React from 'react'
import { logout } from "../../store/authSlice"
import authService from "../../appWrite/auth"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LogoutBtn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = () => {
        authService.logout()
            .then(() => { dispatch(logout()) })
            .catch((error) => console.log(error))

        navigate("/signup", { replace: true })
        localStorage.clear()


    }
    return (
        <button onClick={ logoutHandler }>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>

        </button>
    )
}

export default LogoutBtn

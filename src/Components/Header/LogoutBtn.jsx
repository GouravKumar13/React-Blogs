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
            .then(() => {
                dispatch(logout())
                navigate('/login')
            })




    }
    return (
        <button onClick={ logoutHandler } className='transition ease-in-out delay-150 h-10 hover:scale-110 hover:bg-black duration-300 font-medium text-white bg-slate-500 px-2 rounded-sm shadow-2xl   '>
            Logout

        </button>
    )
}

export default LogoutBtn

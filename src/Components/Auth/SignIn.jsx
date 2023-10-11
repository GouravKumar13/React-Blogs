import React from 'react'
import { useDispatch } from 'react-redux'
import authService from "../../appWrite/auth"
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useState } from 'react'
import { login as authLogin } from '../../store/authSlice'

const SignIn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError(" ")
        try {
            const session = await authService.login(data)
            if (session) {
                // agar user hai to uska data le liya or store mai login call kar diya or navigate kar diya "/" pe
                const userData = await authService.getCurrentUser
                if (userData) {
                    dispatch(authLogin(userData))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error)
        }
    }

    return (

        < div >
            <p>{ error }</p>
            login
        </div >
    )
}

export default SignIn

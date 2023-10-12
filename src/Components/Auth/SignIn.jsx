import React from 'react'
import { useDispatch } from 'react-redux'
import authService from "../../appWrite/auth"
import { Link, useNavigate } from 'react-router-dom'

import { useState } from 'react'
import { login as authLogin } from '../../store/authSlice'
import Input from '../Utils/Input'
import { useFormik } from 'formik'
import googleAuthLogo from "../../assets/google-color-svgrepo-com.svg"
import discordAuthLogo from "../../assets/discord-svgrepo-com.svg"
import { signInSchema } from './AuthSchemas/signinSchema'

const SignIn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const initialValues = {
        email: "",
        password: ""
    }
    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues,
        validationSchema: signInSchema,
        validateOnBlur: false,
        validateOnChange: true,

        onSubmit: async (values, action) => {
            try {
                const session = await authService.login(values)
                console.log(session)
                if (session) {
                    // agar user hai to uska data le liya or store mai login call kar diya or navigate kar diya "/" pe
                    const userData = await authService.getCurrentUser
                    if (userData) {
                        dispatch(authLogin(userData))
                        navigate("/")
                    }
                }
            } catch (error) {
                console.log(error)
                alert("invalid credential")
                action.resetForm()
            }
            action.resetForm()
        }


    })



    return (
        <div className="border  py-6 shadow-lg shadow-slate-600 flex justify-center flex-col items-center mx-auto  my-36 w-[400px] rounded-sm gap-2">
            <div className="flex gap-2 justify-center items-center ">
                <a >
                    <button className=" px-3 py-1 rounded-sm border flex justify-center items-center gap-4 "><img src={ googleAuthLogo } height="32" width="32" alt="connect with discord" /><span className=" font-semibold ">Google</span></button>
                </a>
                <a  >
                    <button className=" px-3 py-1 rounded-sm border flex justify-center items-center gap-4 "><img src={ discordAuthLogo } height="32" width="32" alt="connect with discord" /><span className=" font-semibold ">Linkedin</span></button>
                </a>
            </div>
            <hr className='w-full ' />
            <h1 className="font-bold text-3xl text-neutral-700 ">Welcome!</h1>
            < form onSubmit={ handleSubmit } className='flex flex-col items-center  w-[80%]'  >
                <div className="w-full group flex flex-col border border-solid border-[#ddd] rounded mb-[20px] transition-[0.3s] focus-within:border-[#8c7569]
                    " >
                    <Input label="Email" type="email" placeholder=" Enter Email"
                        autoComplete="off"
                        name="email"
                        value={ values.email }
                        onChange={ handleChange }
                        onBlur={ handleBlur }


                    />
                    { errors.email && touched.email ? (
                        <p className="text-[11px] text-red-500 pl-[4px]">{ errors.email }</p>
                    ) : null }
                </div>
                <div className="w-full group flex flex-col border border-solid border-[#ddd] rounded mb-[20px] transition-[0.3s] focus-within:border-[#8c7569]
                    " >
                    <Input label="Password" type="Password" placeholder=" Enter Password"
                        autoComplete="off"
                        name="password"
                        value={ values.password }
                        onChange={ handleChange }
                        onBlur={ handleBlur }


                    />
                    { errors.password && touched.password ? (
                        <p className="text-[11px] text-red-500 pl-[4px]">{ errors.password }</p>
                    ) : null }
                </div>
                <button className="bg-blue-500 text-white px-3 py-1 rounded-sm" type="submit">
                    LOGIN
                </button>

            </form >
            <p className="text-slate-500 mt-3">
                Not have an account? <Link to="/signup" className=' text-blue-500'>Sign Up</Link>
            </p>
        </div>
    )
}

export default SignIn

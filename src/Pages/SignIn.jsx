import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import authService from "../appWrite/auth"
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react'
import { login } from '../store/authSlice'
import Input from '../Components/Utils/Input'
import googleAuthLogo from "../assets/google-color-svgrepo-com.svg"
import discordAuthLogo from "../assets/discord-svgrepo-com.svg"
import { signInSchema } from '../Components/Auth/AuthSchemas/SigninSchema'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast';



const SignIn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, formState: { errors }, handleSubmit, setValue } = useForm({ resolver: yupResolver(signInSchema) });

    const authLogin = async (data) => {


        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData))
            }
        } catch (error) {
            toast.error('Invalid credential')
            // add react toast instead of alert
        }
    }

    const handleGuestLogin = () => {
        setValue("email", "mvp@gmail.com");
        setValue("password", "1234567890")
    }


    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={ false }
            />
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
                < form onSubmit={ handleSubmit(authLogin) } className='flex flex-col items-center  w-[80%]'  >
                    <div className="w-full group flex flex-col border border-solid border-[#ddd] rounded mb-[20px] transition-[0.3s] focus-within:border-[#8c7569]
                    " >
                        <Input label="Email" type="email" placeholder=" Enter Email"
                            name="email"

                            { ...register("email", {
                                required: true,

                            }) }


                        />
                        <p className='text-red-500 text-xs pl-2'>{ errors.email?.message }</p>


                    </div>
                    <div className="w-full group flex flex-col border border-solid border-[#ddd] rounded mb-[20px] transition-[0.3s] focus-within:border-[#8c7569]
                    " >
                        <Input label="Password" type="Password" placeholder=" Enter Password"
                            autoComplete="off"
                            name="password"
                            { ...register("password", {
                                required: true,
                            }) }


                        />
                        <p className='text-red-500 text-xs pl-2'>{ errors.password?.message }</p>
                    </div>
                    <div className='flex gap-2'>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded-sm" type="submit">
                            LOGIN
                        </button>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded-sm" type='button' onClick={ handleGuestLogin } >
                            AS GUEST
                        </button>
                    </div>

                </form >
                <p className="text-slate-500 mt-3">
                    Not have an account? <Link to="/signup" className=' text-blue-500'>Sign Up</Link>
                </p>



            </div>
        </>
    )
}

export default SignIn

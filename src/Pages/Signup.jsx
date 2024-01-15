import React from 'react'
import { Input } from "../Components/index.js"
import { Link, useNavigate } from 'react-router-dom'
import { signUpSchema } from "../Components/Auth/AuthSchemas/SignupSchema.js"
import googleAuthLogo from "../assets/google-color-svgrepo-com.svg"
import discordAuthLogo from "../assets/discord-svgrepo-com.svg"
import authService from '../appWrite/auth.js'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice.js'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, formState: { errors }, handleSubmit } = useForm({ resolver: yupResolver(signUpSchema) });
    const createUser = async (data) => {

        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            alert(error.message)
        }
    }


    return (
        <div className="border f py-6 shadow-lg shadow-slate-600 mx-auto my-20 flex justify-center items-center flex-col w-[400px] rounded-sm gap-2">

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

            <form onSubmit={ handleSubmit(createUser) } className='flex flex-col items-center  w-[80%]' >
                <div className=" w-full group flex flex-col border border-solid border-[#ddd] rounded mb-[20px] transition-[0.3s]
focus-within:border-[#8c7569]
                    ">
                    <Input
                        placeHolder="Enter your name"
                        label="Name"
                        type="name"
                        autoComplete="off"
                        name="name"
                        { ...register("name", {
                            required: true,
                        }) }

                    />
                    <p className='text-red-500 text-xs pl-2'>{ errors.name?.message }</p>
                </div>
                <div className="w-full group flex flex-col border border-solid border-[#ddd] rounded mb-[20px] transition-[0.3s]
focus-within:border-[#8c7569]
                    " >

                    <Input
                        placeHolder="Enter your email"
                        label="Email"
                        type="email"
                        autoComplete="off"
                        name="email"
                        { ...register('email', {
                            required: true,
                        }) }

                    />

                    <p className="text-[11px] text-red-500 pl-[4px]">{ errors.email?.message }</p>

                </div>
                <div className="w-full group flex flex-col border border-solid border-[#ddd] rounded mb-[20px] transition-[0.3s] focus-within:border-[#8c7569]
                    " >

                    <Input
                        placeHolder="Enter your password"
                        label="Password"
                        type="password"
                        autoComplete="off"
                        name="password"

                        { ...register('password', {
                            required: true,
                        }) }
                    />
                    <p className="text-[11px] text-red-500 pl-[4px]">{ errors.password?.message }</p>

                </div>
                <div className="w-full group flex flex-col border border-solid border-[#ddd] rounded mb-[20px] transition-[0.3s]
focus-within:border-[#8c7569]
                    ">

                    <Input
                        placeHolder="Confirm your password"
                        label="Confirm Password"
                        type="Password"
                        autoComplete="off"
                        name="confirm_password"
                        { ...register('confirm_password', {
                            required: true,
                        }) }
                    />
                    <p className="text-[11px] text-red-500 pl-[4px]">{ errors.confirm_password?.message }</p>

                </div>
                <button className="bg-blue-500 text-white px-3 py-1 rounded-sm" type="submit">
                    Registration
                </button>

            </form>
            <p className="text-slate-500 mt-3">
                Already have an account? <Link to="/login" className=' text-blue-500 cursor-pointer'>Log In</Link>
            </p>
        </div>

    )
}

export default Signup

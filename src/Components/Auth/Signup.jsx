import React from 'react'
import { Input } from "../index.js"
import { Link, useNavigate } from 'react-router-dom'
import { signUpSchema } from "./AuthSchemas/SignupSchema.js"
import { useFormik } from 'formik'
import googleAuthLogo from "../../assets/google-color-svgrepo-com.svg"
import discordAuthLogo from "../../assets/discord-svgrepo-com.svg"
import authService from '../../appWrite/auth.js'
import { useDispatch } from 'react-redux'
import { login } from '../../store/authSlice.js'

const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirm_password: "",
    };

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
        useFormik({
            initialValues: initialValues,
            validationSchema: signUpSchema,
            validateOnChange: true,
            validateOnBlur: false,

            onSubmit: async (values, action) => {

                try {
                    const session = await authService.createAccount(values)
                    console.log(session)
                    if (session) {
                        const userData = await authService.getCurrentUser()
                        if (userData) dispatch(login(userData))
                        navigate("/")
                    }

                } catch (error) {
                    console.log(error)


                }
            },
        });




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

            <form onSubmit={ handleSubmit } className='flex flex-col items-center  w-[80%]' >
                <div className=" w-full group flex flex-col border border-solid border-[#ddd] rounded mb-[20px] transition-[0.3s]
focus-within:border-[#8c7569]
                    ">
                    <Input
                        label="Name"
                        type="name"
                        autoComplete="off"
                        name="name"
                        placeholder="Name"
                        value={ values.name }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                    />
                    { touched.name && errors.name ? (
                        <p className="text-[11px] text-red-500 pl-[4px]">{ errors.name }</p>
                    ) : null }
                </div>
                <div className="w-full group flex flex-col border border-solid border-[#ddd] rounded mb-[20px] transition-[0.3s]
focus-within:border-[#8c7569]
                    " >

                    <Input
                        label="Email"
                        type="email"
                        autoComplete="off"
                        name="email"
                        placeholder="Email"
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

                    <Input
                        label="Password"
                        type="password"
                        autoComplete="off"
                        name="password"

                        placeholder="Password"
                        value={ values.password }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                    />
                    { errors.password && touched.password ? (
                        <p className="text-[11px] text-red-500 pl-[4px]">{ errors.password }</p>
                    ) : null }
                </div>
                <div className="w-full group flex flex-col border border-solid border-[#ddd] rounded mb-[20px] transition-[0.3s]
focus-within:border-[#8c7569]
                    ">

                    <Input
                        label="Confirm Password"
                        type="Password"
                        autoComplete="off"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        value={ values.confirm_password }
                        onChange={ handleChange }
                        onBlur={ handleBlur }
                    />
                    { errors.confirm_password && touched.confirm_password ? (
                        <p className="text-[11px] text-red-500 pl-[4px]">{ errors.confirm_password }</p>
                    ) : null }
                </div>
                <button className="bg-blue-500 text-white px-3 py-1 rounded-sm" type="submit">
                    Registration
                </button>

            </form>
            <p className="text-slate-500 mt-3">
                Already have an account? <Link href="/login" className=' text-blue-500 cursor-pointer'>Log In</Link>
            </p>
        </div>

    )
}

export default Signup

/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useNavigate } from 'react-router-dom'
import LogoutBtn from "../Header/LogoutBtn"




function Header () {

    const authStatus = useSelector((state) => state.auth.status) // getting the status from auth
    // const navigate = useNavigate()
    const navItems = [
        {
            name: "Home",
            URL: "/",
            active: true
        },
        {
            name: "Login",
            URL: "/login",
            active: !authStatus
        },
        {
            name: "Signup",
            URL: "/signup",
            active: !authStatus
        },
        {
            name: "All Post",
            URL: "/allPost",
            active: authStatus
        },
        {
            name: "Add Post",
            URL: "/addPost",
            active: authStatus
        },



    ]
    return (

        <nav className='flex items-center justify-between  my-1 h-12   mx-10 w-full'>
            <div>

                <h1 className='cursor-pointer font-bold  text-3xl'>SPEECH</h1>

            </div>
            <div className='w-[40%] flex'>
                <input className='relative w-full focus:border drop-shadow rounded-md text-center py-1 focus:border-blue-600 outline-none' type="text" placeholder='you will be able to search here' />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="absolute top-4 mx-1 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>

            </div>
            <ul className='flex  gap-[30%] justify-end items-center font-semibold ' >
                {
                    navItems.map((navItem) => {
                        return (
                            navItem.active ? (
                                //add link after configuring browser router
                                <li className='cursor-pointer'>{ navItem.name }</li>
                            ) : null

                        )
                    })
                }
            </ul>

        </nav>

    )
}

export default Header

/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useNavigate } from 'react-router-dom'
import LogoutBtn from "../Header/LogoutBtn"




function Header () {

    const authStatus = useSelector((state) => state.auth.status) // getting the status from auth
    const [openNav, setOpenNav] = React.useState(false)

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

        <nav className=' flex items-center justify-between  md:my-2   h-12    w-full'>
            <div>
                <Link to="/">
                    <h1 className='cursor-pointer font-bold  text-3xl'>SPEECH</h1>
                </Link>

            </div>
            <div className='w-[40%] hidden md:flex'>
                <input className='relative w-full focus:border drop-shadow rounded-md text-center py-1 focus:border-blue-600 outline-none' type="text" placeholder='you will be able to search here' />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="absolute top-4 mx-1 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>

            </div>


            <div className='hidden md:flex  items-center flex-col md:flex-row  justify-between w-[25%]'>
                <ul className='flex flex-col md:flex-row w-full  gap-3 lg:gap-0  justify-around items-center font-semibold ' >
                    {
                        navItems.map((navItem) =>
                        (
                            navItem.active ? (
                                //add link after configuring browser router
                                <Link to={ navItem.URL } key={ navItem.name }>
                                    <li className='cursor-pointer text-sm'><p>{ navItem.name }</p></li>


                                </Link>
                            ) : null

                        )
                        )
                    }
                </ul>

                { authStatus && (
                    <LogoutBtn />
                )
                }
            </div>
            <div className="block md:hidden">

                { openNav ?
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={ () => setOpenNav(!openNav) } fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className=" w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </>
                    :
                    <svg onClick={ () => setOpenNav(!openNav) } xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="  w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                    </svg>
                }
            </div>

            { openNav && <div className='md:hidden flex absolute top-16 right-4  w-[100px]  rounded py-2    items-center flex-col  bg-[#c6ccd8cc] backdrop-blur-md    justify-between '>
                <ul className='flex flex-col w-full  gap-3  justify-around items-center font-semibold  ' >
                    {
                        navItems.map((navItem) =>
                        (
                            navItem.active ? (
                                //add link after configuring browser router
                                <Link to={ navItem.URL } key={ navItem.name }>
                                    <li className='cursor-pointer text-sm hover:bg[#6a8cd1cc] ' ><p>{ navItem.name }</p></li>


                                </Link>
                            ) : null

                        )
                        )
                    }
                </ul>

                { authStatus && (
                    <LogoutBtn />
                )
                }
            </div> }


        </nav>

    )
}

export default Header

/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useNavigate } from 'react-router-dom'
import LogoutBtn from "../Header/LogoutBtn"




function Header () {

    const userData = useSelector((state) => state.auth) // getting the status from auth
    const authStatus = userData.status
    const currentUser = userData.userData

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

        <nav className=' flex items-center justify-between   md:my-2   h-12    w-full'>
            <div>
                <Link to="/">
                    <h1 className='cursor-pointer font-bold ml-2 md:ml-0 text-3xl'>SPEECH</h1>
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
                                    <li className='cursor-pointer text-sm xl:text-lg '><p>{ navItem.name }</p></li>


                                </Link>
                            ) : null

                        )
                        )
                    }
                    { authStatus && (
                        <Link to="/userProfile">
                            <li className='cursor-pointer  text-sm list-none uppercase flex relative'><img src={ localStorage.getItem('avatar') ? localStorage.getItem('avatar') : localStorage.getItem('defaultAvatar') } alt="" className='h-10' />
                            </li>
                        </Link>

                    )
                    }
                </ul>


            </div>
            <div className=''>
                <div className="block md:hidden mr-2 ">

                    { openNav ?

                        <svg onClick={ () => setOpenNav(!openNav) } xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>


                        :
                        <svg onClick={ () => setOpenNav(!openNav) } xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="  w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                        </svg>
                    }
                </div>

                { openNav && <div className={ `${openNav ? "left-0" : "left-[-100%]"}  z-10 md:hidden absolute top-20 transition ease-in-out duration-1000   flex h-full  w-full  rounded py-2    items-center flex-col  bg-[#c6ccd8cc] backdrop-blur-md    justify-between ` }>
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
                        { authStatus && (
                            <li className='cursor-pointer  text-sm list-none uppercase flex '><p>{ currentUser.name }</p></li>

                        )
                        }
                    </ul>


                </div> }
            </div>



        </nav >



    )
}

export default Header

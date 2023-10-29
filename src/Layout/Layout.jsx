/* eslint-disable no-unused-vars */
import React from 'react'
import { AuthGurd, Footer, Header, Home, SignIn, Signup } from '../Components'
import { Outlet, createBrowserRouter } from 'react-router-dom'

const Layout = () => {

    return (
        <div className='max-w-screen-xl flex flex-col  min-h-[100vh] overflow-hidden mx-auto'>
            <Header />
            <Outlet />

            <Footer />

        </div>
    )
}

export default Layout


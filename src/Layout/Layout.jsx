/* eslint-disable no-unused-vars */
import React from 'react'
import { Footer, Header, MainContainer, SignIn, Signup } from '../Components'
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

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        //include the error element here
        children: [
            { path: "/", element: <MainContainer /> },
            { path: "/login", element: <SignIn /> },
            { path: "/signup", element: <Signup /> },
        ]
    }
])


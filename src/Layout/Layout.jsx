/* eslint-disable no-unused-vars */
import React from 'react'
import { AuthGurd, Footer, Header, Home, SignIn, Signup } from '../Components'
import { Outlet, createBrowserRouter } from 'react-router-dom'
import AddPost from '../Pages/AddPost'
import AllPost from '../Pages/AllPost'
import EditPost from '../Pages/EditPost'
import Post from '../Pages/Post'


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
            { path: "/", element: <Home /> },
            {
                path: "/login", element:
                    <AuthGurd authentication={ false }>

                        <SignIn />
                    </AuthGurd>
            },

            {
                path: "/signup", element:
                    <AuthGurd authentication={ false }>
                        <Signup />
                    </AuthGurd>
            },
            {
                path: "/addPost", element:
                    <AuthGurd authentication>
                        <AddPost />
                    </AuthGurd>

            },
            {
                path: "/allPost", element:
                    <AuthGurd authentication>
                        <AllPost />
                    </AuthGurd>
            },
            {
                path: "/edit-post/:slug",
                element: (
                    <AuthGurd authentication>

                        <EditPost />
                    </AuthGurd>
                ),
            },
            {
                path: "/post/:slug",
                element: <Post />,
            },
        ]
    }
])


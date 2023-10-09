/* eslint-disable no-unused-vars */
import React from 'react'
import { Footer, Header } from '../Components'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout


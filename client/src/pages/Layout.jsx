import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold">QuickAI</h1>
            <Outlet />
        </div>
    )
}

export default Layout

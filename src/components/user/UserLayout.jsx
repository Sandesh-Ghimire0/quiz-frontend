import React from 'react'
import UserNav from './UserNav'
import { Outlet } from 'react-router-dom'

function UserLayout() {
    return (
        <>
            <UserNav />
            <div className='container pt-3'>
                <Outlet />
            </div>
        </>
    )
}

export default UserLayout
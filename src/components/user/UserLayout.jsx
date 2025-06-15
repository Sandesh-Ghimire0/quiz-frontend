import React from 'react'
import UserNav from './UserNav'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'


function UserLayout() {
    const status = useSelector(state => state.auth.status)
    if(!status){
        return <div className='mt-5 ml-10'>
            <h2 className='text-xl font-bold mb-5'>Unauthorized Access</h2>
            <NavLink to="/">
                <button className='bg-blue-600 text-white px-4 py-2 cursor-pointer'>Go to Home</button>
            </NavLink>
        </div>
    }
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
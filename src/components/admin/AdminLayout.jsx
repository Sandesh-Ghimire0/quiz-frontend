import React from 'react'
import {NavLink, Outlet} from 'react-router-dom'
import Navbar from './Navbar'
import {  useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getMyQuestions } from '../../services/adminService'
import { saveQuestion } from '../../store/questionSlice'



function AdminLayout() {
    const status = useSelector(state => state.auth.status)
    const userData = useSelector(state => state.auth.userData)

    if (!status || userData.role === "USER") {
        return (
            <div className='mt-5 ml-10'>
                <h2 className='text-xl font-bold mb-5'>Unauthorized Access</h2>
                <NavLink to="/">
                    <button className='bg-blue-600 text-white px-4 py-2 cursor-pointer'>Go to Home</button>
                </NavLink>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className='container pt-3'>
                <Outlet />
            </div>
        </>
    )
}

export default AdminLayout
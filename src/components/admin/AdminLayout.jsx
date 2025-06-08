import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from './Navbar'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getMyQuestions } from '../../services/adminService'
import { saveQuestion } from '../../store/questionSlice'


function AdminLayout() {

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
import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from './Navbar'

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
import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {
    const userData = useSelector(state => state.auth.userData)
    return (
        <div className='flex justify-center mt-10 '>
            <div className='bg-gray-200 p-5 rounded-lg shadow-xl'>
                <p>Username : {userData.name}</p>
                <p>Email : {userData.email}</p>
            </div>
        </div>
    )
}

export default Profile
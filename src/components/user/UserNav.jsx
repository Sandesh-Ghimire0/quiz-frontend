import React from 'react'
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../../services/authService';
import { logout } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { saveQuestion } from '../../store/questionSlice';
import { useNavigate } from 'react-router-dom';

function UserNav() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () =>{
        const res = await logoutUser()
        if(res.status === 200){
            dispatch(logout())
            dispatch(saveQuestion([]))
    
            navigate('/')
        }
      }
   return (
    <div className='bg-white shadow-md px-6 py-3'>
        <nav className="container flex flex-row-reverse items-center justify-between">
        {/* Left Side: Navigation */}
        <div className="flex items-center gap-6">

            <NavLink
            to="/profile"
            className={({ isActive }) =>
                `text-sm font-medium hover:text-blue-600 ${
                isActive ? 'text-blue-600' : 'text-gray-700'
                }`
            }
            >
            Profile
            </NavLink>

            <NavLink
            onClick={handleLogout}
            className="text-sm font-medium text-red-500 hover:text-red-600"
            >
            Logout
            </NavLink>
        </div>

        {/* Right Side: Logo */}
        <NavLink to='/home'>
            <div className="text-xl font-bold text-blue-600">QuizApp</div>
        </NavLink>
        </nav>
    </div>
  );
}


export default UserNav
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { logoutUser } from '../../services/authService';
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice';
import { saveQuestion } from '../../store/questionSlice';

export default function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

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
            to="/admin/dashboard"
            className={({ isActive }) =>
                `text-sm font-medium hover:text-blue-600 ${
                isActive ? 'text-blue-600' : 'text-gray-700'
                }`
            }
            >
            Dashboard
            </NavLink>

            {/* Questions Dropdown */}
            <div className="relative">
            <button
                onClick={toggleDropdown}
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
                Questions ▾
            </button>
            {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                <NavLink
                    onClick={toggleDropdown}
                    to="/admin/questions/my"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                    My Questions
                </NavLink>
                <NavLink
                    onClick={toggleDropdown}
                    to="/admin/questions/create"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                    Create Question
                </NavLink>
                </div>
            )}
            </div>

            <NavLink
            to="/admin/users"
            className={({ isActive }) =>
                `text-sm font-medium hover:text-blue-600 ${
                isActive ? 'text-blue-600' : 'text-gray-700'
                }`
            }
            >
            Users
            </NavLink>

            <NavLink
            to="/admin/profile"
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
        <NavLink to='/admin/dashboard'>
            <div className="text-xl font-bold text-blue-600">QuizApp</div>
        </NavLink>
        </nav>
    </div>
  );
}

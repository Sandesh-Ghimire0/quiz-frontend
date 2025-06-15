import React, { useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const [userInput, setUserInput] = useState({
        email:'',
        password:''
    })

    const handleLogin = async (formData) =>{
        setEmailError(false)
        setPasswordError(false)
        try {
            const userFormData = Object.fromEntries(formData.entries())
            const res = await loginUser(userFormData)
            const loggedInUser = res.data?.data
            const message = res.response?.data.message

            if(res.status === 200){
                dispatch(login({userData:loggedInUser}))
                if(loggedInUser.role === 'USER'){
                    navigate('/home')
                } else if(loggedInUser.role === 'ADMIN'){
                    navigate('/admin/dashboard')
                }
            } else{
                console.error("Error occured while logging")
                if(message === "User does not exist"){
                    setEmailError(true)
                } else if(message === "Incorrect password"){
                    setPasswordError(true)
                }

            }
        } catch (error) {
            console.error("Error occured in login page:", error)
        }
    }

    return (
        <>
            <div className='bg-white shadow-md px-6 py-3 mb-1 '>
                <nav className="container flex flex-row-reverse items-center justify-between">
                {/* Left Side: Navigation */}
                <div className="flex items-center gap-6">
                    <NavLink
                        to="/signup"
                        className={({ isActive }) =>
                            `text-sm font-medium bg-blue-600 px-4 py-2 text-white rounded-md ${
                            isActive ? 'text-blue-600' : 'text-gray-700'
                            }`
                        }
                    >
                        sign up
                    </NavLink>

                </div>

                {/* Right Side: Logo */}
                <NavLink to='/'>
                    <div className="text-xl font-bold text-blue-600">QuizApp</div>
                </NavLink>
                </nav>
            </div>
                
            <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden">
            {/* Left Section */}
            <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center p-10">
                <div>
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
                    Welcome to QuizApp
                </h1>
                <p className="mt-4 text-lg text-gray-700 font-medium max-w-md">
                    Master your knowledge with engaging quizzes and track your
                    progress.
                </p>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col items-center justify-center w-full md:w-1/2 px-6 py-12 bg-white">
                <div className="max-w-md w-full space-y-8">
                <h2 className="text-center text-4xl font-bold text-gray-900">
                    Login
                </h2>
                <form action={handleLogin} className="space-y-6">
                    <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userInput.email}
                        onChange={(e) =>
                        setUserInput({ ...userInput, email: e.target.value })
                        }
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                        required
                    />
                    {emailError && (
                        <p className="text-red-500 text-sm mt-1">
                        User does not exist
                        </p>
                    )}
                    </div>

                    <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={userInput.password}
                        onChange={(e) =>
                        setUserInput({ ...userInput, password: e.target.value })
                        }
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                        required
                    />
                    {passwordError && (
                        <p className="text-red-500 text-sm mt-1">
                        Incorrect password
                        </p>
                    )}
                    </div>

                    <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
                    >
                    Login
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300" />
                    <span className="mx-4 text-gray-500 text-sm">OR</span>
                    <div className="flex-grow border-t border-gray-300" />
                </div>

                {/* Google Sign-In */}
                <button
                    onClick={() =>(window.location.href = "http://localhost:8000/auth/google")}
                    className="w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-md shadow-sm flex items-center justify-center gap-2 transition-all"
                >
                    <svg
                    className="w-5 h-5"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M44.5 20H24V28.5H35.5C34.7 32.5 31.8 35.8 28 38.2L28.1 38.3L34.6 43.1L34.7 43.2C39.6 39.5 43 33.2 44.5 26.5L44.5 20Z"
                        fill="#4285F4"
                    />
                    <path
                        d="M24 44.5C30.6 44.5 36.2 42.1 40.2 38.2L34.7 32.8C31.5 35.1 28.2 36.5 24 36.5C18.6 36.5 13.9 33 12.1 27.6L12 27.7L6.4 32C8.3 36.2 14.8 40.5 24 44.5Z"
                        fill="#34A853"
                    />
                    <path
                        d="M12.1 27.6L6.4 32C6.1 31.4 6 30.7 6 30V18C6 17.3 6.1 16.6 6.4 16L12.1 20.3C13.9 14.9 18.6 11.5 24 11.5C27.9 11.5 31.2 13.1 33.7 15.3L39.2 10.3C36.2 7.5 32.1 5.5 24 5.5C14.8 5.5 8.3 9.8 6.4 14Z"
                        fill="#F9BC05"
                    />
                    <path
                        d="M24 11.5C28.2 11.5 31.5 13.1 33.7 15.3L39.2 10.3C36.2 7.5 32.1 5.5 24 5.5C14.8 5.5 8.3 9.8 6.4 14L12.1 18.3C13.9 14.9 18.6 11.5 24 11.5Z"
                        fill="#EA4335"
                    />
                    </svg>
                    Sign in with Google
                </button>

                <div className="text-md mt-6 text-center">

                    <NavLink to="/signup" className="text-blue-500 hover:underline">
                    create New Account
                    </NavLink>
                </div>
                </div>
            </div>
            </div>
        </>
    );
}

export default Login
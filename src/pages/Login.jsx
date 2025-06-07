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
                dispatch(login(loggedInUser))
                if(loggedInUser.role === 'USER'){
                    navigate('/home')
                } else if(loggedInUser.role === 'ADMIN'){
                    navigate('/admin/dashboard')
                }
            } else{
                console.error("Error occured logging")
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 p-4">
        <div className="bg-gray-50 p-8 rounded-xl shadow-2xl border border-gray-200 max-w-md w-full text-center">
            <h2 className="text-4xl font-bold mb-8 text-gray-900">Login</h2>

            <form action={handleLogin} className="space-y-6">
            <div>
                <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700 mb-1">
                Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    name='email'
                    value={userInput.email}
                    onChange={(e)=>setUserInput({...userInput,email:e.target.value})}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-gray-900"
                    required
                />
                {emailError && <p className='text-red-500'>User does not exist</p>}

            </div>
            <div>
                <label htmlFor="password" className="block text-left text-sm font-medium text-gray-700 mb-1">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name='password'
                    value={userInput.password}
                    onChange={(e)=>setUserInput({...userInput,password:e.target.value})}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-gray-900"
                    required
                />
                {passwordError && <p className='text-red-500'>Incorrect password</p>}

            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg"
            >
                Login
            </button>
            </form>

            <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="bg-gray-50 px-2 text-gray-500">Or continue with</span>
            </div>
            </div>

            <button
                onClick={() => window.location.href = 'http://localhost:8000/auth/google'}
                className="mt-6 w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-3 px-8 rounded-full shadow-sm transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300 flex items-center justify-center space-x-2"
            >
            {/* Google Icon SVG */}
                <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M44.5 20H24V28.5H35.5C34.7 32.5 31.8 35.8 28 38.2L28.1 38.3L34.6 43.1L34.7 43.2C39.6 39.5 43 33.2 44.5 26.5L44.5 20Z" fill="#4285F4"/>
                    <path d="M24 44.5C30.6 44.5 36.2 42.1 40.2 38.2L34.7 32.8C31.5 35.1 28.2 36.5 24 36.5C18.6 36.5 13.9 33 12.1 27.6L12 27.7L6.4 32C8.3 36.2 14.8 40.5 24 44.5Z" fill="#34A853"/>
                    <path d="M12.1 27.6L6.4 32C6.1 31.4 6 30.7 6 30V18C6 17.3 6.1 16.6 6.4 16L12.1 20.3C13.9 14.9 18.6 11.5 24 11.5C27.9 11.5 31.2 13.1 33.7 15.3L39.2 10.3C36.2 7.5 32.1 5.5 24 5.5C14.8 5.5 8.3 9.8 6.4 14Z" fill="#F9BC05"/>
                    <path d="M24 11.5C28.2 11.5 31.5 13.1 33.7 15.3L39.2 10.3C36.2 7.5 32.1 5.5 24 5.5C14.8 5.5 8.3 9.8 6.4 14L12.1 18.3C13.9 14.9 18.6 11.5 24 11.5Z" fill="#EA4335"/>
                </svg>
                <span>Sign in with Google</span>
            </button>

            <div className='flex flex-col'>
                <button
                    className="mt-6 text-blue-500 hover:text-blue-700 text-sm font-semibold transition duration-300 ease-in-out focus:outline-none"
                >
                    Don't have an account? sign up here
                </button>

                <NavLink to="/">
                    <button
                        className="mt-6 text-blue-500 hover:text-blue-700 text-sm font-semibold transition duration-300 ease-in-out focus:outline-none"
                    >
                        Back to Home
                    </button>
                </NavLink>
            </div>
        </div>
        </div>
    );
}

export default Login
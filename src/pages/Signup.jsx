import React from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { signUpUser } from '../services/authService';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [emailError, setEmailError] = useState(false)
    const [userInput , setUserInput] = useState({
        name:'',
        email:"",
        password:''
    })

    const handleSignup = async (formData) =>{
        setEmailError(false)
        const userData = Object.fromEntries(formData.entries())
        try {
            const res = await signUpUser(userData)
            console.log(res)
            if(res.status === 200){
                dispatch(login(res.data.data))
                navigate('/home')
            } else{
                if(res.response.data.message === 'Email already exist'){
                    setEmailError(true)
                }
            }
        } catch (error) {
            console.log("Failed to signup the User:", error)
        }
    }

    return (
        <>
            <div className='bg-white shadow-md px-6 py-3 mb-1 '>
                <nav className="container flex flex-row-reverse items-center justify-between">
                {/* Left Side: Navigation */}
                <div className="flex items-center gap-6">
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            `text-sm font-medium bg-blue-600 px-4 py-2 text-white rounded-md ${
                            isActive ? 'text-blue-600' : 'text-gray-700'
                            }`
                        }
                    >
                        Login
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
                    Create New Account
                </h2>
                <form action={handleSignup} className="space-y-6">
                    <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userInput.name}
                        onChange={(e) =>setUserInput({ ...userInput, name: e.target.value })}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                        required
                    />
                    </div>
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
                    {emailError && <p className='text-red-500'>Email already exist</p>}
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
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
                    >
                    Sign Up
                    </button>
                </form>

                </div>
            </div>
            </div>
        </>
    );
}

export default Signup
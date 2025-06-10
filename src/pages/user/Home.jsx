import React from 'react'
import { NavLink, useSearchParams } from 'react-router-dom';
import { fetchQuestions } from '../../services/userService';
import { useState } from 'react';

function Home() {
    const [nQuestions , setNqQuestions] = useState('')
    const handleSubmit = async (e) =>{
            e.preventDefault(); // prevent default form submission
            console.log("clicked clicked")
            const res = await fetchQuestions(nQuestions)
            console.log(res)
    }

    return (
        <>
            <div className="pt-16"> {/* Padding top to make space for fixed navbar */}
                <div className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 15rem)' }}>
                    <form className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md" onSubmit={handleSubmit} method='get'>
                        <h2 className="text-2xl font-bold mb-6 text-center">Configure Questions</h2>

                        <label className="block text-gray-700 mb-2" htmlFor="numQuestions">
                            Number of Questions:
                        </label>
                        <input
                            type="number"
                            id="numQuestions"
                            name='noOfQuestions'
                            value={nQuestions}
                            onChange={(e)=> setNqQuestions(e.target.value)}
                            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label className="block text-gray-700 mb-2" htmlFor="mode">
                            Mode:
                        </label>
                        <select
                            id="mode"
                            name="mode"
                            className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="read">Read</option>
                            <option value="test">Test</option>
                        </select>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>    
        </>
    );
}

export default Home
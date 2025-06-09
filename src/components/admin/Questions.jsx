import React from 'react'

function Questions({question,handleEdit, successId, handleDelete}) {
    return (
        <>
            <div className="bg-white p-6 rounded-xl shadow-md mb-6 relative">
                {
                    successId === question.id && <div className='absolute -top-6 left-0 '>
                        <p className='text-md bg-green-100 px-3 py-2 text-green-800'>✅ Question updated Successfully !!</p>
                    </div>
                }
                <h3 className="text-xl font-medium mb-2">{question.title}</h3>
                <p className="text-gray-700 mb-4">
                    <span className="font-semibold">Answer:</span> {question.answer}
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4">
                    {question.options.map((opt, index) => (
                    <li key={index}>{opt.text}</li>
                    ))}
                </ul>
                <div className="flex gap-3">
                    <button 
                    onClick={()=>handleEdit(question.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                        Edit
                    </button>
                    <button 
                        onClick={()=>handleDelete(question.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
                        Delete
                    </button>
                </div>
            </div>
        </>
    )
}

export default Questions
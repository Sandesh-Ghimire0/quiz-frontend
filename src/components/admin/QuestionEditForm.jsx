import React, { useState } from 'react'

function QuestionEditForm({ question,setShowEditFormId }) {
    const [input, setInput] = useState({
        title: question.title,
        answer: question.answer,
        options: [
        { text: question.options[0]?.text || '' },
        { text: question.options[1]?.text || '' },
        { text: question.options[2]?.text || '' },
        { text: question.options[3]?.text || '' },
        ],
    })

    const handleSave = async ()=>{
        console.log(input)

        setShowEditFormId(prev => !prev)
    }


    return (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <div className="mb-4">
            <label className="inline-flex text-gray-700 font-medium mb-1">Question:</label>
            <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={input.title}
            onChange={(e) => setInput({ ...input, title: e.target.value })}
            />
        </div>

        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Answer:</label>
            <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={input.answer}
            onChange={(e) => setInput({ ...input, answer: e.target.value })}
            />
        </div>

        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Options:</label>
            <ul className="space-y-2">
            {input.options.map((opt, index) => (
                <li key={index} className="flex items-center gap-2">
                <span className="w-20 text-gray-600">Option {index + 1}:</span>
                <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={opt.text}
                    onChange={(e) => {
                    const updatedOptions = [...input.options]
                    updatedOptions[index].text = e.target.value
                    setInput({ ...input, options: updatedOptions })
                    }}
                />
                </li>
            ))}
            </ul>
        </div>

        <div className="flex gap-3 justify-end">
            <button 
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition">
            Save
            </button>
            <button 
                onClick={()=>setShowEditFormId(prev => !prev)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition">
            Cancel
            </button>
        </div>
        </div>
    )
}

export default QuestionEditForm

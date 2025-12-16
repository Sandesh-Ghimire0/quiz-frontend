import React from 'react'
import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { createQuestion } from '../../services/adminService';
import JSON5 from 'json5'


function CreateQuestion() {
    const initialInput = `[
    {
        title: "  ?",
        answer: " ",
        options: {
        create: [
                { text: " " },
                { text: " " },
                { text: " " },
                { text: " " }
            ]
        }
    } 
]`
    const [successMessage, setSuccessMessage] = useState(false)
    const [inputQuestion, setInputQuestion] = useState(initialInput)

    const handleQuestionSubmit = async () =>{
        const parsedQuestion = JSON5.parse(inputQuestion)
        try {
            const res = await createQuestion(parsedQuestion)
            if(res.status === 200){
                setSuccessMessage(true)
                setInputQuestion(initialInput)

                setTimeout(() => {
                    setSuccessMessage(false)
                }, 3000);
            }
        } catch (error) {
            console.log("Error while creating question :: ", error)
        }
    }
    return (
        <>
            <h2 className='text-xl font-semibold mb-5'>Create questions</h2>
            {successMessage && (
                <div className='text-green-500 font-medium mt-3 mb-3'>
                ✅ Question created successfully!
                </div>
            )}
            <div>
                <Editor
                    height="400px"
                    defaultLanguage="javascript" // IMPORTANT: not json
                    value={inputQuestion}
                    onChange={(val) => setInputQuestion(val)}
                    theme="vs-dark"
                    options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    automaticLayout: true,
                }}
            />
            </div>
            <button 
                className='px-4 py-3 mt-4 text-white bg-blue-600 cursor-pointer hover:bg-blue-500 rounded-lg' 
                onClick={handleQuestionSubmit}
            >Submit Questions</button>
        </>
    )
}

export default CreateQuestion
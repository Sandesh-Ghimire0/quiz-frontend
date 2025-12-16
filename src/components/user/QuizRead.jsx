import React, { useState } from 'react';

function QuizRead({ question, selectedIndex, onAnswer, currQuestionNo,noOfQuestions,mode }) {
    console.log(selectedIndex)
    const answered = selectedIndex !== undefined;

    const handleOptionClick = (index) => {
        if (answered) return; // multiple attempt not allowed
        onAnswer(index);
    };


    
    return (
        <li className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
            <span className='text-gray-500 text-md mb-3'>question : {currQuestionNo +'/'+ noOfQuestions}</span>
            <p className="text-lg font-medium mb-4">{question.title}</p>
            <div className="space-y-2">
                {question.options.map((option, index) => {
                    let style = 'bg-gray-100 hover:bg-blue-100 text-gray-800';

                    if (answered) {
                        const isCorrect = option.text === question.answer;
                        const isSelected = index === selectedIndex;

                        if(mode === 'read'){
                            if (isCorrect) {
                            style = 'bg-green-200 text-green-700';
                            } else if (isSelected) {
                                style = 'bg-red-200 text-red-700';
                            } else {
                                style = 'bg-gray-100 text-gray-500';
                            }
                        } else if(mode === 'test'){
                            if(isSelected){
                                style = 'bg-blue-200 text-blue-700'
                            } else{
                                style = 'bg-gray-100 text-gray-500'
                            }
                        }
                    }

                    return (
                        <p
                            key={index}
                            onClick={() => handleOptionClick(index)}
                            className={`${style} px-4 py-2 rounded-lg cursor-pointer transition duration-200 border border-gray-300`}
                        >
                            {option.text}
                        </p>
                    );
                })}
            </div>
        </li>
    ); 
}

export default React.memo(QuizRead);

// Report.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import AllSolutions from './AllSolutions';

function generateReportSummary(questions, answers) {
    let total = questions.length;
    let attempted = 0;
    let correct = 0;
    let incorrect = 0;

    questions.forEach((q, index) => {
        // retreving id of each question sequentially
        const questionId = Object.keys(answers)[index];
        // geting the index or option selected by user
        const selectedIndex = answers[questionId];

        // checking if any option is selected or not
        if (selectedIndex !== undefined) {
            attempted++;
            // getting the selected option
            const selectedText = q.options[selectedIndex]?.text;
            // checking if selected option match the answer or not
            if (selectedText === q.answer) {
                correct++;
            } else {
                incorrect++;
            }
        }
    });

    const skipped = total - attempted;

    return {
        total,
        attempted,
        skipped,
        correct,
        incorrect,
        score: `${correct} / ${total}`,
        percentage: ((correct / total) * 100).toFixed(2)
    };
}

const Report = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { questions, answers } = location.state || {};
    const [viewSolutions , setViewSolutions] = useState(false)

    if (!questions || !answers) {
        return (
            <div className="text-center mt-20">
                <p className="text-lg text-red-500">Missing quiz data. Please take a quiz first.</p>
                <button 
                    onClick={() => navigate('/home')} 
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    Go to Home
                </button>
            </div>
        );
    }

    const report = generateReportSummary(questions, answers);

    return (
        <>
            <div className="bg-white p-6 rounded-xl shadow-md text-gray-800 space-y-4 max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold text-blue-600">Quiz Performance</h2>
            <p><strong>Total Questions:</strong> {report.total}</p>
            <p><strong>Attempted:</strong> {report.attempted}</p>
            <p><strong>Skipped:</strong> {report.skipped}</p>
            <p><strong>Correct:</strong> {report.correct}</p>
            <p><strong>Incorrect:</strong> {report.incorrect}</p>
            <p><strong>Score:</strong> {report.score}</p>
            <p><strong>Percentage:</strong> {report.percentage}%</p>

            <button 
                onClick={() => navigate('/home')} 
                className="mt-6 w-full py-2 bg-green-600 text-white rounded-md"
            >
                Retake Quiz
            </button>

            <div 
                className='text-blue-700 hover:underline cursor-pointer'
                onClick={()=>setViewSolutions(prev => !prev)}
            >{viewSolutions ? 'hide solutions': 'view solutions'}</div>

        </div>
        {
            viewSolutions && <AllSolutions questions={questions} answers={answers}/>
        }
        </>
    );
};

export default Report;

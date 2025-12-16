import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveQuestion } from '../../store/questionSlice';

function NavigationButtons({ goNext, goPrev, currentIndex, qLength, questions, answers }) {
    const navigate = useNavigate();

    const handleQuit = () => {
        navigate('/home');
    };

    const handleDone = () => {
        navigate('/report', {
            state: { questions, answers }
        });
    };


    return (
        <div className="w-full max-w-2xl mt-8">
            <div className="flex flex-wrap justify-between items-center gap-4">
                <button
                    onClick={handleQuit}
                    className="flex-1 min-w-[100px] px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition"
                >
                    Quit
                </button>

                <div className="flex gap-4 flex-1 justify-center min-w-[200px]">
                    <button
                        onClick={goPrev}
                        disabled={currentIndex === 0}
                        className={`px-5 py-2 font-medium rounded-lg shadow ${
                            currentIndex === 0
                                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                : 'bg-gray-600 text-white hover:bg-gray-700 transition'
                        }`}
                    >
                        Previous
                    </button>

                    <button
                        onClick={goNext}
                        disabled={currentIndex === qLength - 1}
                        className={`px-5 py-2 font-medium rounded-lg shadow ${
                            currentIndex === qLength - 1
                                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700 transition'
                        }`}
                    >
                        Next
                    </button>
                </div>

                {currentIndex === qLength - 1 && (
                    <button
                        onClick={handleDone}
                        className="flex-1 min-w-[100px] px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition"
                    >
                        Done
                    </button>
                )}
            </div>
        </div>
    );
}

export default NavigationButtons;

import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams, useSearchParams } from 'react-router-dom'
import QuizRead from '../../components/user/QuizRead'
import { fetchQuestions } from '../../services/userService'
import {useQuery} from '@tanstack/react-query'
import {saveQuestion} from '../../store/questionSlice'
// import { useCallback } from 'react'

function Quiz() {
    const dispatch = useDispatch()
    let [searchParams, setSearchParams] = useSearchParams();
    const noOfQuestions = searchParams.get('noOfQuestions')
    const mode = searchParams.get('mode')
      
    const questions = useSelector(state => state.question.data)
    const [currentIndex, setCurrentIndex] = useState(0)

    const [answers, setAnswers] = useState({});
   
    const getQuestions = async () => {
        const res = await fetchQuestions(noOfQuestions);
        if (res.status === 200) {
            dispatch(saveQuestion(res.data.data));
            return res.data.data;
        }
    };

    const {data, isPending, isError, error} = useQuery({
        queryKey:['quiz-questions',questions],
        queryFn:getQuestions,
        staleTime:60 * 1000
    })


    // useEffect(()=>{
    //     getQuestions()
    // },[])



  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }
   const handleAnswer = (questionId, selectedIndex) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: selectedIndex
        }));
    };

    const currentQuestion = questions[currentIndex]
    const currentAnswer = answers[currentQuestion?.id];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      {/* Timer */}
      {mode=== 'text' && <div className="mb-6 text-2xl font-semibold text-blue-600">
        Time Left: 00:00:00
      </div>}

      {/* Current Question */}
      <ul className="w-full max-w-2xl space-y-6">
        {currentQuestion && (
            <QuizRead
                key={currentQuestion.id}
                index={currentIndex + 1}
                question={currentQuestion}
                selectedIndex={currentAnswer}
                noOfQuestions={noOfQuestions}
                onAnswer={(index) => handleAnswer(currentQuestion.id, index)}
            />
        )}
      </ul>

    {/* Navigation Buttons */}
    <div>
        <div className="mt-6 flex justify-between space-x-4">
            <NavLink to='/home'>
                <button className="px-4 mr-2 py-2 bg-red-300 text-red-700 rounded-md disabled:opacity-50">
                Quit
                </button>
            </NavLink>
            <div>
                <button
                    onClick={goPrev}
                    disabled={currentIndex === 0}
                    className="px-4 mr-2 py-2 bg-gray-300 rounded-md disabled:opacity-50"
                    >
                    Previous
                </button>
                <button
                    onClick={goNext}
                    disabled={currentIndex === questions.length - 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
                >
                Next
                </button>
            </div>

            {currentIndex === noOfQuestions-1 && <NavLink to='/home'>
                 <button className="px-4 mr-2 py-2 bg-sky-300 text-sky-700 rounded-md disabled:opacity-50">
                Done
                </button>
            </NavLink>}
        </div>
    </div>
    </div>
  )
}

export default Quiz

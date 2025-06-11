import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams, useSearchParams } from 'react-router-dom'
import QuizRead from '../../components/user/QuizRead'
import { fetchQuestions } from '../../services/userService'
import {useQuery} from '@tanstack/react-query'
import {saveQuestion} from '../../store/questionSlice'
import NavigationButtons from '../../components/user/NavigationButtons'
// import { useCallback } from 'react'

function Quiz() {
    const dispatch = useDispatch()
    let [searchParams, setSearchParams] = useSearchParams();
    const noOfQuestions = searchParams.get('noOfQuestions')
    const mode = searchParams.get('mode')
      
    // const questions = useSelector(state => state.question.data)
    const [currentIndex, setCurrentIndex] = useState(0)

    const [answers, setAnswers] = useState({});
   
    const getQuestions = async () => {
        const res = await fetchQuestions(noOfQuestions);
        if (res.status === 200) {
            return res.data.data;
        }
        throw new Error('Failed to fetch');
    };

    const { data: questions = [], isPending, isError, error } = useQuery({
        queryKey: ['quiz-questions', noOfQuestions],
        queryFn: getQuestions,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        staleTime: 0,
    });



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
   const handleAnswer = useCallback((questionId, selectedIndex) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: selectedIndex,
        }));
    }, []);

    const currentQuestion = questions[currentIndex]
    const currentAnswer = answers[currentQuestion?.id];

     if (isPending) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl text-blue-600">Loading questions...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl text-red-600">Error: {error.message}</p>
            </div>
        );
    }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">

      {/* Current Question */}
      <ul className="w-full max-w-2xl space-y-6">
        {currentQuestion && (
            <QuizRead
                key={currentQuestion.id}
                currQuestionNo={currentIndex + 1}
                question={currentQuestion}
                selectedIndex={currentAnswer}
                noOfQuestions={noOfQuestions}
                mode={mode}
                onAnswer={(index) => handleAnswer(currentQuestion.id, index)}
            />
        )}
      </ul>

    {/* Navigation Buttons */}
        <NavigationButtons 
            goNext={goNext}
            goPrev={goPrev}
            currentIndex={currentIndex}
            qLength={questions.length}
            questions={questions}
            answers={answers}
        />
    </div>
  )
}

export default Quiz

import React, { useEffect, useState } from 'react'
import { getMyQuestions } from '../../services/adminService'
import { useSelector,useDispatch} from 'react-redux'
import { saveQuestion } from '../../store/questionSlice'
import {useQuery} from '@tanstack/react-query'
import Questions from '../../components/admin/Questions'
import QuestionEditForm from '../../components/admin/QuestionEditForm'

function MyQuestion() {
    const [editFormId, setShowEditFormId] = useState('')

    const questions = useSelector(state => state.question.data)
    const dispatch = useDispatch()

    const fetchMyQuestions = async()=>{
        try {
            const res = await getMyQuestions()
            if(res.status === 200){
                dispatch(saveQuestion(res.data.data))
            }
        } catch (error) {
            console.log("Error occured while fetching the question",error)

        }
    }

    useEffect(()=>{
        fetchMyQuestions()
    },[])


    function handleEdit(id){
        setShowEditFormId(id)
    }


    return (
    <div className="mt-10 px-4">
        <h2 className="text-2xl font-semibold text-center mb-6 grid grid-col-2">My Questions</h2>
        <div className="grid grid-cols-3 md:grid-cols-2 gap-6">
            {questions?.map((q) => (
                q.id === editFormId
                ?<QuestionEditForm question={q} setShowEditFormId={setShowEditFormId}/>
                :<Questions key={q.id} question={q} handleEdit={handleEdit}/>
            ))}

        </div>
    </div>
  );
}

export default MyQuestion
import React, { useEffect, useState } from 'react'
import { deleteQuestion, getMyQuestions } from '../../services/adminService'
import { useSelector,useDispatch} from 'react-redux'
import { removeQuestion, saveQuestion } from '../../store/questionSlice'
import {useQuery} from '@tanstack/react-query'
import Questions from '../../components/admin/Questions'
import QuestionEditForm from '../../components/admin/QuestionEditForm'

function MyQuestion() {
    const [showEditFormId, setShowEditFormId] = useState('')
    const [successId, setSuccessId] = useState('')
    
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

    async function handleDelete(id){
        try {
            const res = await deleteQuestion(id)
            if(res.status === 200){
                dispatch(removeQuestion(id))
            }
        } catch (error) {
            console.log("Error occured while deleting :: ", error)
        }
    }


    return (
    <div className="mt-10 px-4 relative">
        <h2 className="text-2xl font-semibold text-center mb-6 grid grid-col-2">My Questions</h2>
       
        <div className="grid grid-cols-3 md:grid-cols-2 gap-6">
            {questions?.map((q) => (
                q.id === showEditFormId
                ?<QuestionEditForm 
                    key={q.id} 
                    question={q} 
                    setShowEditFormId={setShowEditFormId} 
                    setSuccessId={setSuccessId} 
                />
                :<Questions 
                    key={q.id} 
                    question={q} 
                    handleEdit={handleEdit} 
                    successId={successId}
                    handleDelete={handleDelete}
                />
            ))}

        </div>
    </div>
  );
}

export default MyQuestion
import { api } from "./api";


export const createQuestion = async (questions)=>{
    try {
        const res = await api.post('/admin/create-questions', {questions})
        return res
    } catch (error) {
        console.log("Unable to create a question :: ", error)
        return error
    }
}

export const getMyQuestions = async ()=>{
    try {
        const res = await api.get('/admin/get-created-questions')
        return res
    } catch (error) {
        console.log("Failed to get the questions ::",error)
        return error
    }
}


export const updateQuestion = async (question)=>{
    try {
        const res = await api.put('/admin/update-question',{question})
        return res
    } catch (error) {
        console.log("Error occured while updating: ",error)
        return error
    }
}


export const deleteQuestion = async (questionId)=>{
    try {
        const res = await api.post('/admin/delete-question', {questionId})
        return res
    } catch (error) {
        console.log("Failed to Delete", error)
        return error
    }
}


export const getUsersInfo = async ()=>{
    try {
        const res = await api.get('/admin/get-all-users')
        return res
    } catch (error) {
        console.log("Failed to get Users data: ",error)
        return error
    }
}

export const deleteUser = async (id)=>{
    try {
        const res = await api.delete(`/admin/delete-user/${id}`)
        return res
    } catch (error) {
        console.log("Failed to delete the User : ",error)
        return error
    }
}
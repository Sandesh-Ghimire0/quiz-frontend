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
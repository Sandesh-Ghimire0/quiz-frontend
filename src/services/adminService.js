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
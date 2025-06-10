import { api } from "./api";


export const fetchQuestions = async(noOfQuestions) =>{
    try {
        const res = await api.get(`/user/fetch-questions?noOfQuestions=${noOfQuestions}`)
        return res
    } catch (error) {
        console.log("Error occured while fetching quiz question ::", error)
        return error
    }
}
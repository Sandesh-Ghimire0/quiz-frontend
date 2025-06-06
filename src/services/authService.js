import { api } from "./api";


export const loginUser = async (user) =>{
    try {
        const res = await api.post('/user/login',user)
        return res
    } catch (error) {
        console.log("Login error : ",error.message)
        return error
    }
}
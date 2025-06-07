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

export const signUpUser = async (user)=>{
    try {
        const res = await api.post('/user/signup',user)
        return res
    } catch (error) {
        console.log("Login error : ",error.message)
        return error
    }
}

export const currentUser = async ()=>{
    try {
        const res = await api.get('/user/me')
        return res
    } catch (error) {
        console.log("Failed to fetch the current user: ", error.message)
        return error
    }
}
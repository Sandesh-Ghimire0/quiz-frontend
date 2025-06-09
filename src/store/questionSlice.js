import { createSlice } from "@reduxjs/toolkit";
import { deleteQuestion } from "../services/adminService";


const initialState = {
    data:[],
    status:null
}


const questionSlice = createSlice({
    name:'question',
    initialState,
    reducers:{
        saveQuestion:(state, action)=>{
            state.status = true
            state.data = action.payload
        },
        changeQuestion:(state, action)=>{
            state.data = state.data.map(ques =>(
                ques.id === action.payload.questionId
                ?action.payload.newQuestion
                :ques
            ))
        },
        removeQuestion:(state, action)=>{
            state.data = state.data.filter(ques => ques.id !== action.payload)
        }
    }
})

export const {saveQuestion, changeQuestion, removeQuestion} = questionSlice.actions
export default questionSlice.reducer



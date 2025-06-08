import { createSlice } from "@reduxjs/toolkit";


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
        }
    }
})

export const {saveQuestion} = questionSlice.actions
export default questionSlice.reducer



import {createSlice } from "@reduxjs/toolkit";

const forminitialState = {like : "" , Comment : "" , rating : 0};

const defaultformSlice = createSlice({
    name : 'defaultform',
    initialState : forminitialState,
    reducers : {
        likeCheck(state , action){
            state.like = action.payload 
        },
        commentCheck(state , action){
            state.Comment = action.payload
        } ,
        ratingCheck(state , action){
            state.rating = action.payload
        }
    }
})

export default defaultformSlice.reducer;
export const defaultformAction = defaultformSlice.actions;
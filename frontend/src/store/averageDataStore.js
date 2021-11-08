import {createSlice } from "@reduxjs/toolkit";

const itemsinitialState = {menudata  : [] , likedata : {} , submitdata : []};

const averagedataSlice = createSlice({
    name : 'averagedata',
    initialState : itemsinitialState,
    reducers : {
        itemCheck(state , action){
            // state.data.push(...action.payload)
            state.menudata = action.payload.slice();       
        },
        likedataCheck(state , action){
            // state.data.push(...action.payload)
            state.likedata = Object.assign(action.payload , {});   
            // console.log(state.menudata)    
        },
        submitdataCheck(state , action){
            // state.data.push(...action.payload)
            state.submitdata = action.payload.slice();       
        }
    }
})

export default averagedataSlice.reducer;
export const averagedataAction = averagedataSlice.actions;
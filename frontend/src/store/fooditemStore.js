import {createSlice } from "@reduxjs/toolkit";

const itemsinitialState = {data  : []};

const fooditemSlice = createSlice({
    name : 'fooditem',
    initialState : itemsinitialState,
    reducers : {
        itemCheck(state , action){
            // state.data.push(...action.payload)
            state.data = action.payload.slice();       
        }
    }
})

export default fooditemSlice.reducer;
export const fooditemAction = fooditemSlice.actions;
import {createSlice} from "@reduxjs/toolkit"

const catagoriesSlice = createSlice({
    name: "catagories",
    initialState: [],
    reducers:{
      setCatagories(state, action){
        return state = action.payload
       
      }
    }
})

export const {setCatagories} = catagoriesSlice.actions

export default catagoriesSlice.reducer

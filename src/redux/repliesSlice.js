import {createSlice} from "@reduxjs/toolkit"

const repliesSlice = createSlice({
    name: "replies",
    initialState: [],
    reducers:{
      setReplies(state, action){
        return state = action.payload
       
      }
    }
})

export const {setReplies} = repliesSlice.actions

export default repliesSlice.reducer
import {createSlice} from "@reduxjs/toolkit"

const postsSlice = createSlice({
    name: "posts",
    initialState: [],
    reducers:{
      setPosts(state, action){

        return state = action.payload
       
      }
    }
})

export const {setPosts} = postsSlice.actions

export default postsSlice.reducer
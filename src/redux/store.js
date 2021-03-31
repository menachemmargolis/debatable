import {configureStore} from "@reduxjs/toolkit"
import topicReducer from "./topicsSlice"
import postsReducer from "./postsSlice"
import repliesReducer from "./repliesSlice"
import userReducer from "./userSlice"
import catagoriesReducer from "./catagoriesSlice"
import searchReducer from "./searchSlice"

// even though we never created a const of "store" because of "export default" it does it for us
const store = configureStore({
    reducer: {
        topics: topicReducer,
        posts: postsReducer,
        replies: repliesReducer,
        user: userReducer,
        catagories: catagoriesReducer,
        search: searchReducer
    },
})

export default store
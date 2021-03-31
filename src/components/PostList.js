import React, {useEffect} from "react"
import Post from "./Post"
import {useSelector, useDispatch} from "react-redux"



export default function PostList({posts}){
    
    const search = useSelector((storeState) => storeState.search)
    const allPosts = posts.map((post) =>  <Post key={post.title} obj={post} />).filter((post) => {
        if(search.length == 0){return true}
   
        return post.props.obj.title.includes(search)
      }) 

    return(
        <>
        {allPosts}
        </>
    )
}
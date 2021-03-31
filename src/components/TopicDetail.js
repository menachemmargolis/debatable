import PostList from "./PostList"
import PostForm from "./PostForm"
import React, {useEffect} from "react"
import {useParams} from  "react-router-dom";
import {useSelector, useDispatch} from "react-redux"
import { setPosts } from "../redux/postsSlice";

export default function TopicDetail(){
    const params = useParams();
    const id = params.id

    const dispatch = useDispatch()
    const posts = useSelector((storeState) => storeState.posts)
   
    useEffect(() => {
        fetch(`http://localhost:3002/posts`)
        .then(res => res.json())
        .then(data => {
            dispatch(setPosts(data))
        })
    },[])
   const filterdPosts = posts.filter((post) => post.topic_id == id)

  return(
        <>
        <PostList posts={filterdPosts} />
        
        <PostForm topicId={id} />
        </>
    )
}
import Reply from "./Reply"
import {useParams} from  "react-router-dom";
import React, {useEffect} from "react"
import { setReplies } from "../redux/repliesSlice";
import {useSelector, useDispatch} from "react-redux"

export default function ReplyList({id}){

    const params = useParams();
    const dispatch = useDispatch()
    const replies = useSelector((storeState) => storeState.replies)
   
    
    const postReplies = replies.filter((reply) => reply.post_id == id )
    
    const createReplys = postReplies.map((reply)=> <Reply obj={reply}/>)
    return(
        <>
        {createReplys}
        </>
    )
}
import {useSelector, useDispatch} from "react-redux"
import Reply from "./Reply"


export default function AllReplies(){
    const replies = useSelector((storeState) => storeState.replies)
    const search = useSelector((storeState) => storeState.search)
    
    const createReplys = replies.map((reply)=> <Reply obj={reply}/>).filter((reply) => {
     if(search.length == 0){return true}

     return reply.props.obj.title.includes(search)
   }) 

    return(
        <>
        {createReplys}
        </>
    )
}
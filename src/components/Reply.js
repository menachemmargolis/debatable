import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import {setReplies} from "../redux/repliesSlice"
import {useDispatch, useSelector} from "react-redux"


export default function Reply({obj}){
    
    const userId = null
    const replies = useSelector((storeState) => storeState.replies)
    const dispatch = useDispatch()

   function handleDelete(){
       
       fetch(`http://localhost:3002/replies/${obj.id}`,{
           method:"DELETE",
           headers:{"content-type":"application/json"}
       })
      .then(() => {
          const removeReply = replies.filter((reply) => reply.id !== obj.id)
          dispatch(setReplies(removeReply))
      })
    

   }

    return(
        <>
        <Card className='profile-card bg-dark text-white' style={{ width: '18rem', margin: '0 auto', marginTop: '100px' }}>
        <Card.Title>{obj.title}</Card.Title>
             <Card.Body>
              <Card.Text>
                  {obj.content}
                 </Card.Text>
               <Button onClick={handleDelete}>
                   Delete
               </Button>
             </Card.Body>
         </Card>
           </>
    )
}
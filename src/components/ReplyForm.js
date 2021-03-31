import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {useHistory} from "react-router-dom"
import React,  {useState, useEffect} from "react"
import { setPosts } from "../redux/postsSlice";
import { setReplies } from "../redux/repliesSlice";
import {useSelector, useDispatch} from "react-redux"


export default function ReplyForm({postId}){

        const history = useHistory();
        const dispatch = useDispatch()
        const posts = useSelector((storeState) => storeState.posts)
        const user = useSelector((storeState) => storeState.user)
        const replies = useSelector((storeState) => storeState.replies)
        const [reply, setReply] = useState({
            user_id:user.id,
            title:"",
            content:""
        })

        const newReply ={
          user_id: reply.user_id,
          post_id: postId,
          title: reply.title,
          content: reply.content
      }


      function handleChange(e){
        
        const name = e.target.name
        const value = e.target.value
        
        setReply({
            ...reply,
        [name]:value, })
      }

      function handleSubmit(e){
        e.preventDefault()
        
        fetch(`http://localhost:3002/replies`,{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(newReply)
        })
        .then(res => res.json())
        .then(data => {
          if(!data.erros){
          const addReply = [...replies,data]
          dispatch(setReplies(addReply))
          }else(alert(data.erros))
        })
        .then(alert("reply posted"))
        reply.title =""
        reply.content =""
      }

      // window.emailjs.send(
      //   'gmail', templateId,
      //   variables
      //   ).then(res => {
      //     console.log('Email successfully sent!')
      //   })
      //   // Handle errors here however you like, or use a React error boundary
      //   .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))

    return(
      <>
        <Form style={{ width: '18rem', margin: '0 auto', marginTop: '100px' }} onSubmit={handleSubmit}>
          <h1>Write Reply Here</h1>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" onChange={handleChange} name="title" value={reply.title}  placeholder="Enter title" />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Write Your reply </Form.Label>
          <Form.Control as="textarea" rows={7} onChange={handleChange} name="content" value={reply.content}  placeholder="Content" />
        </Form.Group>
        <Button style={{borderRadius: '25px', marginRight: '8px', }}variant="danger" size="sm" type="submit">
         Submit
       </Button>
      </Form>
      </>
    )
}
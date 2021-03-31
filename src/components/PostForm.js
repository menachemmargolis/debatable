import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import React,  {useState, useEffect} from "react"
import { setPosts } from "../redux/postsSlice";
import {useSelector, useDispatch} from "react-redux"
import ReplyForm from "./ReplyForm";


export default function PostForm({topicId}){
  
  const dispatch = useDispatch()
  const posts = useSelector((storeState) => storeState.posts)
  const user = useSelector((storeState) => storeState.user)

  const [post, setPost] = useState({
      topic_id: topicId,
      user_id:1,
      title:"",
      content:""
  })

   function handleChange(e){
    const name = e.target.name
    const value = e.target.value
    
    setPost({
        ...post,
    [name]:value, })
   }

   function handleSubmit(e){
    e.preventDefault()

    if(user !== null ){
    const newPost ={
        topic_id: post.topic_id,
        user_id: user.id,
        title: post.title,
        content: post.content
    }


    
    fetch(`http://localhost:3002/posts`,{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(newPost)
    })
    .then(res => res.json())
    .then(data => {
      if(data.errors){
        alert(data.errors)
      }
      else{
          const formData = [...posts,data]
          dispatch(setPosts(formData))
        }
      })
    
   
    post.title = ""
    post.content = ""
   }else{alert("you must be logged in to post ")}
   }

    return(
      <>
        <Form className='bg-dark text-white' style={{ width: '18rem', margin: '0 auto', marginTop: '100px' }} onSubmit={handleSubmit}>
          <h1>Write Post Here</h1>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" onChange={handleChange} name="title" value={post.title}  placeholder="Enter title" />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Write Your Post </Form.Label>
          <Form.Control as="textarea" rows={7} onChange={handleChange} name="content" value={post.content}  placeholder="Content" />
        </Form.Group>
        <Button style={{borderRadius: '25px', marginRight: '8px', }}variant="danger" size="sm" type="submit">
         Submit
       </Button>
      </Form>
      </>
    )
}
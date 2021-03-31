import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Nav from "react-bootstrap/Nav"
import { setPosts } from "../redux/postsSlice";
import { setUser } from "../redux/userSlice";
import {useSelector, useDispatch} from "react-redux"
import React, {useState} from "react"
import ReplyForm from "./ReplyForm"
import ReplyList from "./ReplyList"
import { Link } from "react-router-dom";
import { Icon, InlineIcon } from '@iconify/react';
import replyIcon from '@iconify-icons/bi/reply';
import deleteOutlined from '@iconify-icons/ant-design/delete-outlined';
import editOutlined from '@iconify-icons/ant-design/edit-outlined';

import Form from "react-bootstrap/Form"
export default function Post({obj}){
    
    const dispatch = useDispatch()
    const posts = useSelector((storeState) => storeState.posts)
    const user = useSelector((storeState) => storeState.user)
    const [replyForm, setReplyForm] = useState(false)
    const [showReplies, setShowReplies] = useState(false)
    const [editForm, setEditForm] = useState(true)
    const [edit, setEdit] = useState({
        topic_id: obj.topic_id,
        user_id:1,
        title: obj.title,
        content: obj.content
    })

    function handleClick(){
        if(user !== null){
        setReplyForm((replyForm) => !replyForm)
        }else{alert("You must be logged in to reply ")}
    }

    function displayEditForm(){
      if(user !== null){
      setEditForm((editForm) => !editForm)
      }else{alert("You must be logged in to edit ")}
    }
   
    function handleDelete(){
      if(user !== null){
      fetch(`http://localhost:3002/posts/${obj.id}`,{
          method:"DELETE",
          headers:{"content-type":"application/json"},
      })
      .then(() =>{
        const removePost = posts.filter((post) => post.id !== obj.id)
        dispatch(setPosts(removePost))
      })
    }else{alert("You must be logged in to delete ")}
    }

    function handleChange(e){
      const name = e.target.name
      const value = e.target.value

      setEdit({
          ...edit,
          [name]:value
      })

    }

    function handleSubmit(e){
      e.preventDefault()

      if(user !== null){
      const editedPost = {
          topic_id : edit.topic_id,
          user_id :user.id,
          title: edit.title,
          content: edit.content
      }
    
      fetch(`http://localhost:3002/posts/${obj.id}`,{
        method:"PATCH",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(editedPost)
    })
    .then(res => res.json())
    .then(data => {
        dispatch(setPosts(data))
    })
    setEditForm((editForm) => !editForm)
   }else{alert("You must be logged in to edit ")}
    }

    function displayReplies(){
      setShowReplies((showReplies) => !showReplies)
      if(!obj.replies.length > 0){
        alert("this post has no replies, why dont you create one ")
      }
    }
  
 return(
     <>
   { editForm ? <Card  style={{ width: '18rem', margin: '0 auto', marginTop: '100px' }}>
    <Card.Title>{obj.title}</Card.Title>
         <Card.Body>
          <Card.Text>
              {obj.content}
             </Card.Text>
             </Card.Body>
             <Card.Footer>
             <Nav className="mr-auto">
          <Icon  onClick={handleClick} icon={replyIcon} width="30px" padding="10px"/>
         { user && user.id == obj.user_id ?<div>
          <Icon  onClick={handleDelete} icon={deleteOutlined} width="30px"/>
          <Icon  onClick={displayEditForm}  icon={editOutlined} width="30px" />
         </div> : null }
          <Link>
          <p onClick={displayReplies}>Replies</p>
         { showReplies ? <ReplyList id={obj.id} /> : null }
         </Link>
         </Nav>
        </Card.Footer>
     </Card> : 
      <Form  onSubmit={handleSubmit}  style={{ width: '18rem', margin: '0 auto', marginTop: '100px' }} >
          <h1>Edit Post </h1>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text"  name="title" onChange={handleChange}  value={edit.title} />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label> Write Your Post </Form.Label>
          <Form.Control as="textarea" rows={9} onChange={handleChange} name="content"  value={edit.content}  />
        </Form.Group>
        <Button onChange={handleChange}  style={{borderRadius: '25px', marginRight: '8px', }}variant="danger" size="sm" type="submit">
         Submit
       </Button>
      </Form>}
       {replyForm ? <ReplyForm postId={obj.id}/> : null}
     </>
 )
}

// {obj.replies.length > 0 ? <Link  to={'/replies/' + obj.id }> 
// <p>Replies</p>
// </Link> : <Button onClick={()=> alert("This Post has no replies")} style={{borderRadius: '25px' }}variant="danger" size="sm">
// Replies
// </Button>  }
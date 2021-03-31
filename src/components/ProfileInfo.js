import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import React, {useState} from "react"
import {useSelector, useDispatch} from "react-redux"
import { setUser } from "../redux/userSlice";


export default function ProfileInfo(){
    const token = localStorage.getItem("token");
    const dispatch = useDispatch()
    const user =  useSelector((storeState) => storeState.user)
    const [profilePic, setProfilePic] = useState('')
    const [username, setUsername] = useState('')

    function handleProfilePhotoChange(e){
        setProfilePic((profilePic) => profilePic = e.target.files[0])
    }

    function handleUsernameChange(e){
      setUsername((username) => username = e.target.value)
    }

    function handleUsernameSubmit(){

        const editFormData = new FormData()
        editFormData.append("username",username)
        
        if (token) {
        fetch(`http://localhost:3002/updateUsername`,{
            method:"PATCH",
            headers: {Authorization: `Bearer ${token}`},
            body: editFormData
        })
        .then(res => res.json())
        .then(data => {
  
          dispatch(setUser({
              ...user,
              username: data.username}))
  
        })
        
       }
      }


    function handlePictureSubmit(){

      const editUpFormData = new FormData()
      editUpFormData.append("profile_photo",profilePic)

      if (token) {
      fetch(`http://localhost:3002/updtateProfile`,{
          method:"PATCH",
          headers: {Authorization: `Bearer ${token}`},
          body: editUpFormData
      })
      .then(res => res.json())
      .then(data => {

        dispatch(setUser({
            ...user,
            profile_photo: data.profile_photo}))

      })
      
     }
    }


    return(

     <Card className='profile-card bg-dark text-white' style={{ width: '18rem', margin: '0 auto', marginTop: '100px' }}>
        <Card.Title>Profile</Card.Title>
         <Card.Img variant="top" src={user ? user.profile_photo : null} style={{ height:'100px', width:'100px',margin: '0 auto' }} />
         <Form.File  id="formcheck-api-regular">
            <Form.File.Label>Update Profile Picture</Form.File.Label>
            <Form.File.Input onChange={handleProfilePhotoChange} accept="image/png, image/jpeg"  name="featured_image"   />
            <Button onClick={handlePictureSubmit}>update profile photo</Button>
            </Form.File>
             <Card.Body>
                <Card.Text>
                <Form.Group controlId="formGroupEmail">
                <Form.Label>Username</Form.Label>
                    <Form.Control onChange={handleUsernameChange} type="text" name="username" value={username} />
                    <Button onClick={handleUsernameSubmit}>update profile photo</Button>
                </Form.Group>

                  Username : {user ? user.username :null}<br/>
                 </Card.Text>
             </Card.Body>
         </Card>
        
    )
}
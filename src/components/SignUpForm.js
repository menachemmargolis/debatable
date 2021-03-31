import React, {useState} from "react"
import Form from "react-bootstrap/form"
import Button from "react-bootstrap/Button"
import 'bootstrap/dist/css/bootstrap.min.css';
import { setUser } from "../redux/userSlice";
import {useSelector, useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

export default function SignUpForm(){

    const [newUser, setNewUser] = useState({
        username:'',
        password:'',
        profile_photo:null,
        user_email:''
    })
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector((storeState) => storeState.user)
    const [errors, setErrors] = useState([])
    

    function handleChange(e){
      const name = e.target.name
      const value = e.target.value

      setNewUser({
          ...newUser,
          [name]:value
      })
    }

    function handleImageChange(e){
      setNewUser({
        ...newUser,
        profile_photo: e.target.files[0]
    })
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        const signUpFormData = new FormData()
        signUpFormData.append("username", newUser.username)
        signUpFormData.append("password", newUser.password)
        signUpFormData.append("profile_photo", newUser.profile_photo)
        signUpFormData.append("user_email", newUser.user_email)

        fetch("http://localhost:3002/signup", {
          method: "POST",
          body: signUpFormData,
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              return response.json().then((data) => {
                throw data;
              });
            }
          })
          .then((data) => {
            dispatch(setUser(data.user));
            localStorage.setItem("token", data.token);
            history.push("/");
          })
          .catch((data) => {
            setErrors(data.errors);
          });
          
      }
   
    


    return(
        <Form onSubmit={handleSubmit} className='bg-dark text-white' style={{paddingTop: '20px', width: "40%"}}>
        <Form.Group controlId="formGroupUsername">
            <Form.Label>Email</Form.Label>
            <Form.Control onChange={handleChange} name="user_email" type="text" placeholder="Enter Email" value={newUser.user_email}  />
        </Form.Group>
        <Form.Group controlId="formGroupEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control onChange={handleChange} name="username" type="text" placeholder="Enter Username" value={newUser.username}  />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={handleChange} name ="password" type="password" placeholder="Password" value={newUser.password} />
        </Form.Group>
        <div className="mb-3">
            <Form.File id="formcheck-api-regular">
            <Form.File.Label>Upload Image</Form.File.Label>
            <Form.File.Input accept="image/png, image/jpeg"  name="featured_image"  onChange={handleImageChange} />
            </Form.File>
        </div>
        {errors ? errors.map((error)=> <p style={{color: "red"}}>{error}</p>) :null}
        <Button style={{borderRadius: '25px', marginRight: '8px', }}variant="danger" size="sm" type="submit">
         Submit
       </Button>
        </Form>
    )
}
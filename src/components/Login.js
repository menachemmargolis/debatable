import React, {useState} from "react"
import Form from "react-bootstrap/form"
import Button from "react-bootstrap/Button"
import 'bootstrap/dist/css/bootstrap.min.css'
import { setUser } from "../redux/userSlice";
import {useSelector, useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"

export default function SignUpForm(){

    const [loginUser, setLoginUser] = useState({
        username:'',
        password:''
    })
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector((storeState) => storeState.user)
    const [errors, setErrors] = useState([])

    function handleChange(e){
      const name = e.target.name
      const value = e.target.value

      setLoginUser({
          ...loginUser,
          [name]:value
      })
    }
 

    function handleSubmit(e) {
        e.preventDefault();
  
      const formData ={
          username: loginUser.username,
          password: loginUser.password
      }


        fetch("http://localhost:3002/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
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
        <Form className='bg-dark text-white' onSubmit={handleSubmit}  style={{paddingTop: '20px', width: "40%"}}>
        <Form.Group controlId="formGroupEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control onChange={handleChange} name="username" type="text" placeholder="Enter Username" value={loginUser.username}  />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={handleChange} name ="password" type="password" placeholder="Password" value={loginUser.password} />
        </Form.Group>
        {errors.map((error)=> <p style={{color: "red"}}>{error}</p>)}
        <Button style={{borderRadius: '25px', marginRight: '8px', }}variant="danger" size="sm" type="submit">
         Submit
       </Button>
        </Form>
    )
}
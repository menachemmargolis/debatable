import React,{useState} from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Navbar from "react-bootstrap/Navbar"
import Modal from "react-bootstrap/Modal"
import FormControl from "react-bootstrap/FormControl"
import Profile from "./Profile"
import {setUser} from "../redux/userSlice"
import {useSelector, useDispatch} from "react-redux"
import searchSlice, { setSearch } from "../redux/searchSlice";
import {setTopics} from "../redux/topicsSlice"
import {useHistory} from "react-router-dom"
import { Icon, InlineIcon } from '@iconify/react';
import homeIcon from '@iconify-icons/cil/home';
import userProfile from '@iconify-icons/carbon/user-profile';
import loginOutlined from '@iconify-icons/ant-design/login-outlined';
import logoutCircleLine from '@iconify-icons/ri/logout-circle-line';
import logo from "../debatable.png"
import signIn from '@iconify-icons/codicon/sign-in'; 
import outlineTopic from '@iconify-icons/ic/outline-topic';

function NavBar(){

    const history = useHistory()
    const [displayProfile, setDisplayForm] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector((storeState) => storeState.user)
    const search = useSelector((storeState) => storeState.search)
    const topics = useSelector((storeState) => storeState.topics)
    

        function handleClick(){
            setDisplayForm((displayProfile) => !displayProfile)
        }
        
        function handleLogOut(e){
            dispatch(setUser(null))
            localStorage.removeItem("token");
            alert("you have logged out ")
            history.push("/")
        }

        function handleSearch(e){
          dispatch(setSearch( e.target.value))
       }




       /// signup form functionality 
       const [newUser, setNewUser] = useState({
        username:'',
        password:'',
        profile_photo:null,
        user_email:''
    })
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
            setErrors(data.errors);
            newUser.password =''
            newUser.user_email =''
            newUser.username =''
            newUser.profile_photo =  ''
            setShow(false)
          })
          .catch((data) => {
            setErrors(data.errors);
            newUser.password =''
            newUser.user_email =''
            newUser.username =''
            newUser.profile_photo =  ''
          });
          
      }

       const [show, setShow] = useState(false);

       const handleClose = () => setShow(false);
       const handleShow = () => setShow(true);


      // login form functionality 

      const [loginShow, setLoginShow] = useState(false);

      const handleLoginClose = () => setLoginShow(false);
      const handleLoginShow = () => setLoginShow(true);

      const [loginUser, setLoginUser] = useState({
        username:'',
        password:''
    })
  
    const [loginErrors, setLoginErrors] = useState([])

    function handleLoginChange(e){
      const name = e.target.name
      const value = e.target.value

      setLoginUser({
          ...loginUser,
          [name]:value
      })
    }
 

    function handleLoginSubmit(e) {
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
            setLoginShow(false)
            loginUser.username = ''
            loginUser.password= ''
          })
          .catch((data) => {
            setLoginErrors(data.errors);

          });
        }


    return(
        <>
        <Navbar style={{position:"sticky", top: '0',height:"100px", overflow:"hidden", zIndex:"1"}}  bg="primary" variant="dark">
          <Nav className="mr-auto">
          <img style={{height:"8rem", width:"16rem"}} className='logo'src={logo}/>
            <Button style={{borderRadius: '25px',position:"absolute", right:"75px", marginRight: '8px', marginTop: '35px' }}variant="danger" size="sm"  > <li className="nav-item active"><Link to="/" className="nav-link text-uppercase font-weight-bold"><Icon icon={homeIcon} width="30px" height="30px" /><span className="sr-only"></span></Link></li></Button>{' '}
            <Button style={{borderRadius: '25px',position:"absolute", right:"475px", marginRight: '8px', marginTop: '35px' }}variant="danger" size="sm"  > <li className="nav-item active"><Link to="/topics" className="nav-link text-uppercase font-weight-bold"><Icon icon={outlineTopic} width="30px" height="30px" /><span className="sr-only"></span></Link></li></Button>{' '}
           {user ? <Button   style={{borderRadius: '25px',position:"absolute", right:"350px", marginRight: '8px', marginTop: '35px'   }} variant="danger" size="sm"><li className="nav-item"><Link to="/myPosts" className="nav-link text-uppercase font-weight-bold">My Posts<span className="sr-only"></span></Link></li></Button> :null }
            { user ? <Button onClick={handleLogOut} style={{borderRadius: '25px',position:"absolute", right:"175px", marginRight: '8px', marginTop: '35px', height:"50px", width:"50px"    }} variant="danger" size="sm"><Icon icon={logoutCircleLine} width="30px" height="30px" /></Button> :
            <div><Button variant="primary" onClick={handleShow}  style={{borderRadius: '25px', marginRight: '8px',position:"absolute", right:"320px", marginRight: '8px', marginTop: '35px', height:"50px", width:"50px"   }} variant="danger" size="sm"><li className="nav-item"><Icon icon={signIn} width="30px" height="30px" /><span className="sr-only"></span></li></Button> 
            <Button onClick={handleLoginShow}   style={{borderRadius: '25px',position:"absolute", right:"175px", marginRight: '8px', marginTop: '35px', height:"50px", width:"50px" }}  variant="danger" size="sm"><li className="nav-item"><Icon icon={loginOutlined} width="30px" height="30px" /><span className="sr-only"></span></li></Button></div>}
             <Button onClick={handleClick}  style={{borderRadius: '25px',position:"absolute", right:"250px", marginRight: '8px', marginTop: '35px', height:"50px", width:"50px"  }} variant="danger" size="sm"><Icon icon={userProfile} width="30px" height="30px" /></Button> {' '}
             <FormControl onChange={handleSearch} style={{position:"sticky", left:"550px",width:"33", marginTop:"35px", }} type="text" placeholder="Search" className=" mr-sm-2" /> 
             {search.length > 0 ? <Link style={{color:"red", position:'absolute', right:'700px',marginTop:"85px"}} to="/posts">Posts</Link>:null}
             {search.length > 0 ?<Link style={{color:"red", position:'absolute', right:'800px',marginTop:"85px"}}  to="/replies">Replies</Link>:null}
             {search.length > 0 ?<Link style={{color:"red", position:'absolute', right:'900px',marginTop:"85px"}}  to="/">Topics</Link>:null}
          </Nav>
        </Navbar>
       
       <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up  </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}  style={{paddingTop: '20px', width: "100%"}}>
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
      </Modal.Body>
      </Modal>


      <Modal show={loginShow} onHide={handleLoginClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form  onSubmit={handleLoginSubmit}  style={{paddingTop: '20px', width: "100%"}}>
          <Form.Group controlId="formGroupEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control onChange={handleLoginChange} name="username" type="text" placeholder="Enter Username" value={loginUser.username}  />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={handleLoginChange} name ="password" type="password" placeholder="Password" value={loginUser.password} />
          </Form.Group>
          {loginErrors.map((error)=> <p style={{color: "red"}}>{error}</p>)}
          <Button style={{borderRadius: '25px', marginRight: '8px', }}variant="danger" size="sm" type="submit">
          Submit
        </Button>
          </Form>
        </Modal.Body>

      </Modal>

      </>
    )
 
}

export default NavBar;

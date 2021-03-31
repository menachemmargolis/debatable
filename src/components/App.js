import PostList from "./PostList"
import TopicDetail from "./TopicDetail"
import NavBar from "./NavBar"
import Home from "./Home"
import Login from "./Login"
import React, {useEffect, useState} from "react"
import {Redirect, Switch, Route} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"
import { setPosts } from "../redux/postsSlice";
import { setReplies } from "../redux/repliesSlice";
import { setUser } from "../redux/userSlice";
import '../App.css';
import SignUpForm from "./SignUpForm"
import ProfileInfo from "./ProfileInfo"
import AllReplies from "./AllReplies"
import AllPosts from "./AllPosts"
import TopicList from "./TopicList"






/// navbar imports 



function App() {
  
  const dispatch = useDispatch()
  const posts = useSelector((storeState) => storeState.posts)
  const user = useSelector((storeState) => storeState.user)
  const replies = useSelector((storeState) => storeState.replies)
  const filterdPosts = user ? posts.filter((post) => post.user_id == user.id) : posts

  useEffect(() => {
      fetch(`http://localhost:3002/posts`)
      .then(res => res.json())
      .then(data => {
          dispatch(setPosts(data))
      })
      const token = localStorage.getItem("token");
      if(token){
      fetch(`http://localhost:3002/user`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => res.json())
      .then( data => {
        dispatch(setUser(data))
      })
    }
    fetch(`http://localhost:3002/replies`)
    .then(res => res.json())
    .then(data => {
        dispatch(setReplies(data))
    }) 
  },[])

 return (
  <>
 
   <NavBar/>
   <Switch>
   <Route exact path="/info">
      <ProfileInfo/>
    </Route>
    <Route exact path="/topics">
      <TopicList/>
    </Route>
   <Route exact path="/topicDetail/:id">
      <TopicDetail />
    </Route>
    <Route exact path="/">
      <Home/>
    </Route>
    <Route exact path="/myPosts">
      <PostList posts={filterdPosts}/>
    </Route>
    <Route exact path="/signUp">
      <SignUpForm/>
    </Route>
    <Route exact path="/login">
      <Login/>
    </Route>
    <Route exact path="/replies">
      <AllReplies/>
    </Route>
    <Route exact path="/posts">
      <AllPosts/>
    </Route>
   </Switch>   
    </>
  );
}

export default App;

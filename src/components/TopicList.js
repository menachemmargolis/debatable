import Topic from './Topic'
import TopicForm from './TopicForm'
import {useSelector, useDispatch} from "react-redux"
import { setTopics } from "../redux/topicsSlice"
import React, {useEffect, useState} from "react"
import FormControl from "react-bootstrap/FormControl"
import CardDeck from 'react-bootstrap/CardDeck'
import "../TopicList.css"
import CardColumns from 'react-bootstrap/CardColumns'


export default function TopicList(){
   
    const dispatch = useDispatch()
    const topics = useSelector((storeState) => storeState.topics)
    const search = useSelector((storeState) => storeState.search)
    const catagories = useSelector((storeState) => storeState.catagories)
    const [filter, setFilter] = useState('All')
  
    useEffect(()=> {
      fetch(`http://localhost:3002/topics`)
      .then(res => res.json())
      .then(data => {
        dispatch(setTopics(data))
        
      })
    },[])

    function handleChange(e){
      setFilter(e.target.value)
    }


    
   const filtersTopics = topics.filter((topic) => {
     if(filter == "All"){return true}

     return topic.catagory.name == filter
   })

   const allTopics = filtersTopics.map((topic) => {
    return <Topic key={topic.title} obj={topic}  id={topic.id} /> }).filter((topic) => {
     if(search.length == 0){return true}

     return topic.props.obj.title.includes(search)
   }) 

   const allCatagories = catagories.map((catagory) => <option>{catagory.name}</option>)
   
    return(
        <>
       <FormControl  onChange={handleChange} style={{width:"15%"}} as="select">
        {allCatagories}
        <option>All</option>
         </FormControl>
       <CardDeck style={{ marginLeft: '15%', marginRight: '10%', display: 'flex', flexDirection: 'row'}}>
        {allTopics.length > 0 ? allTopics : <h2>No Topic With That Title</h2>}
        <TopicForm />
        </CardDeck>
        </>
    )
}


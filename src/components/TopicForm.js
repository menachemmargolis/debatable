import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import React, {useState, useEffect} from "react" 
import {useDispatch, useSelector} from "react-redux"
import {setTopics} from "../redux/topicsSlice"
import {setCatagories} from "../redux/catagoriesSlice"
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';


export default function TopicForm(){

    const [topicData, setTopicData] = useState({
        title:'',
        description:'',
        catagory_id:1,
        topic_image:''
    })

    const dispatch = useDispatch()
    const topics = useSelector((storeState) => storeState.topics)
    const catagories = useSelector((storeState) => storeState.catagories)
    const user = useSelector((storeState) => storeState.user)

    useEffect(()=> {
        fetch(`http://localhost:3002/catagories`)
        .then(res => res.json())
        .then(data => {
            dispatch(setCatagories(data))
        })
    },[])
    function getCatagoryId(e){
      const catagoryId = catagories.filter((c) => c.name == e.target.value)
       setTopicData((topicData) => topicData = {
        ...topicData,
        catagory_id: catagoryId[0].id
       }) 
       
    }
     
    function HandleChange(e){
      
        const name = e.target.name
        const value = e.target.value

        setTopicData({
            ...topicData,
            [name]:value
        })
    }

    function handleImageChange(e){
      setTopicData({
        ...topicData,
        topic_image: e.target.files[0]
    })
    }
   console.log(topicData.topic_image)
    function handleSubmit(e){
        e.preventDefault()
        if(user){

       const newTopicData = new FormData()
       newTopicData.append("title",topicData.title)
       newTopicData.append("decription",topicData.description)
       newTopicData.append("catagory_id",topicData.catagory_id)
       newTopicData.append("topic_image",topicData.topic_image)

        fetch(`http://localhost:3002/topics`,{
            method:"POST",
            body: newTopicData
        })
        .then(res => res.json())
        .then(data => {
            if(!data.erros){
            const newTopic = [...topics,data]
            dispatch(setTopics(newTopic))
            }else{alert(data.errors)}
        })
        topicData.title = ''
        topicData.description = ''
        topicData.topic_image = ''
     }else(alert("must be logged in to create topic"))
    }
    const allCatagories = catagories.map((catagory) => <option>{catagory.name}</option>)



    return(
        <Form onSubmit={handleSubmit} style={{ width:"25rem", height:"25rem",}} >
        <h1>Create New Topic</h1>
      <Form.Group controlId="formGroupEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" onChange={HandleChange} name="title" value={topicData.title}  placeholder="Enter title" />
      </Form.Group>
      <Form.Control onChange={getCatagoryId} as="select">
        {allCatagories}
      </Form.Control>
      <Form.Group controlId="formGroupPassword">
        <Form.Label>Description </Form.Label>
        <Form.Control as="textarea" rows={7} onChange={HandleChange} name="description" value={topicData.description}  placeholder="description" />
      </Form.Group>
      <div className="mb-3">
            <Form.File id="formcheck-api-regular">
            <Form.File.Label>Upload Image</Form.File.Label>
            <Form.File.Input  onChange={handleImageChange}/>
            </Form.File>
    </div>
      <Button style={{borderRadius: '25px', marginRight: '8px', }}variant="danger" size="sm" type="submit">
       Submit
     </Button>
    </Form>
    )
}
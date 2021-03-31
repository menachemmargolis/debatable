import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import { NavLink } from "react-router-dom";


export default function Topic({obj}){



    return( 
        <NavLink style={{textAlign: "center"}} exact className="button" to ={'/topicDetail/' + obj.id }  >
       <Card style={{flex: 1, width:"20rem", height:"25rem", marginBottom:"5rem"}} className="grid bg-dark" >
            <Card.Img variant="top" style={{ height:'250px', width:'100%',margin: '0 auto' }}  src={obj.topic_image} />
            <Card.Title style={{color:"rgb(184, 6, 6)"}} >{obj.title}</Card.Title>
            <Card.Body>
            <Card.Text>
            <p style={{color:"rgb(184, 6, 6)"}} >{obj.description}</p>
            </Card.Text>
            </Card.Body>
        </Card> 
        </NavLink>
    )
}

{/* <Card.Footer>
<small className="text-muted">Last updated 3 mins ago</small>
</Card.Footer> */}


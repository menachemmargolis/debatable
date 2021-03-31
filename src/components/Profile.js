import Nav from "react-bootstrap/Nav"
import {Link}from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"

export default function Profile(){
    const user =  useSelector((storeState) => storeState.user)

    return(
        <>
        <Nav style={{position:"sticky", top: '100px', right: "10px"}} defaultActiveKey="/home" className="flex-column">
            {user ? <Link to="/info"> Personal info </Link>: null }
            {user ? <Link to="/"> Home </Link>: null  }
       </Nav>
       </>
    )
}
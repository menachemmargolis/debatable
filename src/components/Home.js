import TopicList from "./TopicList"
import TopicForm from "./TopicForm"
import Card from "react-bootstrap/Card"
import logo from "../debatable.png"

export default function Home(){
    return(
        <>
               <Card className='bg-light' style={{width: '60rem',margin: '0 auto',marginTop: '100px' }}>
        <Card.Body>
            <Card.Title style={{fontSize: '30px'}}>Welcome to <a style={{fontSize: 'larger', fontWeight: 'bold', fontStyle: 'oblique'}}>Debatable</a><br></br></Card.Title>
            <br></br>
            <div style={{justifyContent: "center"}}>
            <img style={{width: '50%',height:"200px" }}src={logo} alt='guilt gear logo'/>
            </div>
            <Card.Text>
             
            </Card.Text>
            <hr></hr>
            <br></br>
            <a style={{fontSize: 'large'}}>Welcome to Debatable, where sharing your opnion is not only highly encouraged its the entire point of the app.</a>
            <br></br><br></br>
            <a style={{fontSize: 'large'}}>Over here you dont have to be afraid about what others might think of your opnions, or if you are being to extreme, on the contraray! the crazier the opnion the better.</a>
            <br></br>
            <a style={{fontSize: 'large'}}>With that being said,  there are a couple of rules that every user must follow.</a>
            <br></br><br></br><br></br>
            <a style={{fontSize: 'large'}}>(1. no racist, anti semetic, homophobic, or transphobic language will be tolerated, users who do not comply will have there accounts terminated.</a>
            <br></br><br></br><br></br>
            <a style={{fontSize: 'large'}}>(2. all cursing is tolerated, BUT! if there are multiple reports of bullying about your account, the acount will be suspended, and if continued the account will be terminated.  </a>
            <hr></hr>
            <a style={{fontSize: 'x-large', fontWeight: 'bold'}}> Please enjoy the site, and happy debating</a>
            <hr></hr>
            

        </Card.Body>
      </Card>
        </>
    )
}
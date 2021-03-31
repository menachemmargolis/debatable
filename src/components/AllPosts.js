import { useSelector } from "react-redux"
import Post from "./Post"

export default function AllPosts(){

    const posts = useSelector((storeState) => storeState.posts)
    const search = useSelector((storeState) => storeState.search)

    const allPosts = posts.map((post) =>  <Post key={post.title} obj={post} />).filter((post) => {
        if(search.length == 0){return true}
   
        return post.props.obj.title.includes(search)
      }) 

    return(
        <> 
        {allPosts.length > 0 ?  allPosts : <h1>No Posts With that Title</h1>} 
        </>
    )
}
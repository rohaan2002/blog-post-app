import {useEffect} from 'react'
import { useParams,Link } from 'react-router-dom'
const EditPost = ({posts, handleEdit,editBody,setEditBody,editTitle,setEditTitle}) => {
    const {id}= useParams();
    const post =posts.find(post=>(post.id).toString()===id);


    useEffect(()=>{
        if(post){
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    },[post, setEditTitle, setEditBody])

  return (
    <main className='NewPost'>
    {editTitle && 
    <>
    <h2>Edit Post</h2>
      <form className="newPostForm" onSubmit={(e)=> e.preventDefault()}>
        <label htmlFor="postTitle">Title:</label>
        <input
        id="postTitle"
        type="text"
        required
        value={editTitle}
        onChange={(e)=>setEditTitle(e.target.value)}
        ></input>

        <label htmlFor="postBody">Post:</label>
        <textarea
        id="postBody"
        type="text"
        required
        value={editBody}
        onChange={(e)=>setEditBody(e.target.value)}
        ></textarea>
        <button type='submit' onClick={()=> handleEdit(post.id)}>Submit</button>

      </form>
    </>
    }
    {!editTitle && 
    <>
      <h2>Post Not Found</h2>
      <p>Disappointing, which is!</p>
      <p>
        <Link to='/'>Go to Homepage</Link>
      </p>
    </>
      
    }
    </main>
  )
}


export default EditPost
import { useParams, Link } from "react-router-dom"
// useParams is a custom react hook taht comes with react router dom 
const PostPage = ({ posts, handleDelete }) => {
  const { id } = useParams();
  // useParams is hook which comes with RRD , it helps extracting dynamic part of the URL in a variable
  // name of the variable is suggested to be same as the name of the dynamic part of url
  // const {id}= useParams() -->stores ':id' part of the url
  // if there were 2 dyn parts say ':id' and ':priceId' then 
  // const {id,prideId}= useParams(); -->in the same order as they are in URL
  const post = posts.find(post => (post.id).toString() === id);
  // .find method returns the first post(whic is an obj) which matches the condition
  return (
    <main className="PostPage">
      <article className="post">
        {post &&
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
          <button className="editButton">Edit Post</button></Link>
            <button className="deleteButton" onClick={() => handleDelete(post.id)}>
              Delete Post
            </button>
          </>
        }
        {!post &&
          <>
          <h2>Post Not Found</h2>
          <p>Disappointing, which is!</p>
          <p><Link to='/'>Go to Homepage</Link></p>
          </>
        }
      </article>
    </main>
  )
}

export default PostPage
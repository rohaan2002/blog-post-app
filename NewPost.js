
const NewPost = ({handleSubmit, postTitle, setPostTitle, postBody, setPostBody}) => {
  return (
    <main>
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input
        id="postTitle"
        type="text"
        required
        value={postTitle}
        onChange={(e)=>setPostTitle(e.target.value)}
        ></input>

        <label htmlFor="postBody">Body:</label>
        <textarea
        style={{resize:'none' ,width:'550px', height:'200px' }}
        id="postBody"
        type="text"
        required
        value={postBody}
        onChange={(e)=>setPostBody(e.target.value)}
        ></textarea>
        <button type='submit'>Submit</button>

      </form>
    </main>
  )
}

export default NewPost
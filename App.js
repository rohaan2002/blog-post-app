import './App.css';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
// import editPosts from './editPosts';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import {format} from 'date-fns';
import api from './api/postss'
import EditPost from './editPosts';


function App() {
  const [posts, setPosts]= useState([])
  const [search, setSearch]= useState('');
  const [searchResults, setSearchResults]= useState([]);
  const [postTitle, setPostTitle]= useState('');
  const [postBody, setPostBody]= useState('');
  const [editTitle, setEditTitle]= useState('');
  const [editBody, setEditBody]= useState('');
  const navigate = useNavigate();


  useEffect(()=>{
    const fetchPosts= async()=>{
      try{
        const response= await api.get('/posts')  //this 'api' is ref to axios we used in postss.js
        console.log(response)
        // note that axios is diff than 'fetch' :
        // returns json file, so no need to convert
        // gives ~<=200 response or else throws actual error and not just return 404, thus no need to check if(response.ok).. does that part itself
        setPosts(response.data)
        
      } 
      catch(err){
        if(err.response){
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else{
          console.log(`Error: ${err.message}`)
        }
      }
    }
    fetchPosts();
  },[])

  useEffect(()=>{
    const filteredResults= posts.filter(post=>(post.body).toLowerCase().includes(search.toLowerCase())|| (post.title).toLowerCase().includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  },[posts,search])
  // this works bcuz useEffect also always runs when the page loads initially, and initially search='', which is included in every post so, all posts gets stored in searchResult using setSearchResult(filteredResults) and then the searchResult is passed in Home to get displayed in the DOM

  // dependency array -> [posts,search] means either search or posts changes then the useeffect will get run, and thus will include the newer post in the searchResult which is passed unto Home as for what should be displayed. That is the reason posts is also in Dep. array so that it runs useeffect, gets stored in searchResults and get displayed through Home

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const id= posts.length ? posts[posts.length -1].id+1 : 1;
    const datetime= format(new Date(),'MMMM dd, yyyy pp')
    const newPost= {id, title:postTitle, datetime,body: postBody}
    try{
      const response= await api.post('/posts',newPost);
      console.log(response)
      // yha response ke andr data ke andr sirf ek post h (not an array, just a single object)
    const allPosts= [...posts, response.data]
    setPosts(allPosts)
    setPostBody('')
    setPostTitle('')
    navigate('/')
    } catch(err){
      console.log(`Error: ${err.message}`)
    }

  }
  // instead of useHistory, in RRD v6-> useNavigate() , it helps us navigate anywhere in the website, in the flow of program
  // like.. jab ye chix hogi uske baad hum naviagte hoke yaha ajayege

  const handleEdit=async(id)=>{
    const datetime=format(new Date(), 'MMMM dd, yyyy pp')
    const updatedPost={id, title:editTitle,datetime, body: editBody}
    try{
      const response= await api.put(`/posts/${id}`,updatedPost) //the endpoint here is post/id bcuz updated post will replace the post with that id
      // so no object gettin added, just the older one gets replaced with updatedPost
      // here response have all the post in data (an array with 10 objects)
      setPosts(posts.map(post=> post.id===id? {...response.data}:post))
      setEditTitle('')
      setEditBody('')
      navigate('/');
    }catch(err){
      console.log(`Error: ${err.message}`)
    }
  }
    
  const handleDelete=async(id)=>{
    try{
    await api.delete(`/posts/${id}`)
    const postsList= posts.filter(post=> post.id!==id);
    setPosts(postsList);
    navigate('/');
    }
    catch(err){

    }
    // this means we navigate to og url +'/' means homepage
  }
  
  return (
    <div className="App">
      <Header
      title='React JS Shitposting'
      ></Header>
      <Nav search={search} setSearch={setSearch}></Nav>
      <Routes>  
        {/*Routes is actually a MUST container for all routes , React searches for all the routes inside the "Routes" element. 
        In v5 router its called "Switch" in v6-> "Routes"  */}
        <Route exact path="/" element={<Home posts={searchResults}/>}/>

        {/* i used "exact path" here as if only "path" were used any subsequent url after "/" like "/post" will also match this path AND since it's placed above Router of NewPost element , Home element wala router will PREVAIL */}
      
        <Route exact path ="/post" element={<NewPost
        postTitle={postTitle}
        postBody={postBody}
        setPostTitle={setPostTitle}
        setPostBody={setPostBody}
        handleSubmit={handleSubmit}
        />}/>
        {/* v5-> component={NewPost}
            v6-> element={<NewPost/>}
        */}
         <Route path ="/edit/:id" element={<EditPost
         posts={posts}
        editTitle={editTitle}
        editBody={editBody}
        setEditTitle={setEditTitle}
        setEditBody={setEditBody}
        handleEdit={handleEdit}
        />}/>
        <Route exact path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete}/>}/>
      
        <Route exact path="/about" element={<About/>}/>
        <Route path="*" element={<Missing/>}/>
        {/* This path="*" route is PLACED AT END so that after none of the above paths match, ALL THE OTHER RANDOM PATHS would just be routed to display Missing element */}

      
      </Routes>
      <Footer></Footer>

    </div>
  );
}

export default App;

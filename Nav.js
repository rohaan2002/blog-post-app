import {Link} from 'react-router-dom'

const Nav = ({search,setSearch}) => {
  return (
    <nav className="Nav">
      <form className="searchForm" onSubmit={(e)=>e.preventDefault()}>
    <label htmlFor="search">Search Posts</label>
    <input
      id="search"
      type="text"
      placeholder="Search Posts"
      value={search}
      onChange={(e)=> setSearch(e.target.value)}
      // this is for controlled input AND single source of truth
      ></input>
    {/*many "labels" and many "inputs" are there! which for which? htmlFor tells that only. ex: htmlFor="search" means this "label" is for element with id="search"  */}
  

      </form>
      <ul>
        <li><Link to="/">Home</Link></li>
        {/* <Link to="/post" works same as <a href="existinURL.com/post"
        when the elements containing Link to are clicked : it just changes the url to existingURL+ /whatever
        and we know we have applied "Route" for when a URL changes to a certain specified URL!
        */}
        <li><Link to="/post">Post</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
        {/* <h1>Nav</h1> */}
    </nav>
  )
}

export default Nav
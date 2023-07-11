import {Link} from 'react-router-dom'
const Missing = () => {
  return (
    <main className="Missing">
        <h2>Page Not Found</h2>
        <p>Disappointing, which is!</p>
        <p>
          <Link to='/'>Go to Homepage</Link>
        </p>
    </main>
  )
}

export default Missing
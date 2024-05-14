import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import { motion } from 'framer-motion'
import { FaHeart, FaHome, FaRegUserCircle } from 'react-icons/fa'
import { CiSearch, CiChat1 } from 'react-icons/ci'

export default function Search() {
  const [loading, setLoading] = useState(true)

  const auth = getAuth()
  const user = auth.currentUser

  const location = useLocation()
  const navigate = useNavigate()

  const login = location.state?.from || '/'

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  function logOut() {
    signOut(auth)
      .then(() => {
        navigate(login, { replace: true })
      })
      .catch((error) => {
        setError(error.message)
      })
  }

  return loading ? (
    <h2 className="loading">Loading...</h2>
  ) : (
    <div className="card">
      <h1>Search</h1>
      <div className="dashboard-search">
        <input placeholder="cute dogs" />
      </div>
      <h4>BROWSE ALL</h4>
      <div className="masonry-dogs">
        <img className="masonry-dog" src="/dogs/1.jpeg" />
        <img className="masonry-dog" src="/dogs/2.jpeg" />
        <img className="masonry-dog" src="/dogs/3.jpeg" />
        <img className="masonry-dog" src="/dogs/4.jpeg" />
        <img className="masonry-dog" src="/dogs/5.jpeg" />
        <img className="masonry-dog" src="/dogs/6.jpeg" />
        <img className="masonry-dog" src="/dogs/7.jpeg" />
        <img className="masonry-dog" src="/dogs/8.jpeg" />
        <img className="masonry-dog" src="/dogs/9.jpeg" />
        <img className="masonry-dog" src="/dogs/10.jpeg" />
        <img className="masonry-dog" src="/dogs/11.jpeg" />
        <img className="masonry-dog" src="/dogs/12.jpeg" />
        <img className="masonry-dog" src="/dogs/13.jpeg" />
        <img className="masonry-dog" src="/dogs/14.jpeg" />
        <img className="masonry-dog" src="/dogs/15.jpeg" />
      </div>
      <div className="splash-buttons">
        <div>SEE MORE</div>
      </div>
      <div className="bottom-nav">
        <Link to="/">
          <FaHome />
        </Link>
        <Link to="/search">
          <CiSearch />
        </Link>
        <div className="add-new-icon">+</div>
        <Link to="/chat">
          <CiChat1 />
        </Link>
        <Link to="/customize">
          <FaRegUserCircle />
        </Link>
      </div>
    </div>
  )
}

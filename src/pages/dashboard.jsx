import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import { motion } from 'framer-motion'
import { FaHeart, FaHome, FaRegUserCircle } from 'react-icons/fa'
import { CiSearch, CiChat1 } from 'react-icons/ci'

export default function Dashboard() {
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
      <h1>Discover</h1>
      <h3>Welcome, {user.displayName ? user.displayName : user.email}</h3>
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.9 }} onClick={logOut}>
        Logout
      </motion.button>
      <h4>WHAT'S NEW TODAY</h4>
      <div className="dashboard">
        <img className="main-photo" src="/1.jpeg" />
        <div className="photo-functions">
          <img className="avatar" src="/avatar.png" />
          <div className="author">
            <p>Ridhwan Nordin</p>
            <p>@ridzjcob</p>
          </div>
          <div className="heart-icon">
            <FaHeart />
          </div>
        </div>
      </div>
      <h4>BROWSE ALL</h4>
      <div className="masonry">
        <img className="masonry-photo" src="/2.jpeg" />
        <img className="masonry-photo" src="/3.jpeg" />
        <img className="masonry-photo" src="/4.jpeg" />
        <img className="masonry-photo" src="/5.jpeg" />
        <img className="masonry-photo" src="/6.jpeg" />
        <img className="masonry-photo" src="/7.jpeg" />
        <img className="masonry-photo" src="/8.jpeg" />
        <img className="masonry-photo" src="/9.jpeg" />
        <img className="masonry-photo" src="/10.jpeg" />
        <img className="masonry-photo" src="/11.jpeg" />
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

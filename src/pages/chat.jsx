import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import { motion } from 'framer-motion'
import { FaHeart, FaHome, FaRegUserCircle } from 'react-icons/fa'
import { CiSearch, CiChat1 } from 'react-icons/ci'

export default function Chat() {
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
      <h1>Chats</h1>
      <div className="chat-dashboard">
        <div className="chat-div">
          <img className="user-pfp" src="/profiles/user_a.jpeg" />
          <div>
            <h4>James</h4>
            <p>Thank you! That was very helpful!</p>
          </div>
        </div>
        <div className="chat-div">
          <img className="user-pfp" src="/profiles/user_b.jpeg" />
          <div>
            <h4>Will Kenny</h4>
            <p>I know... I’m trying to get the funds.</p>
          </div>
        </div>
        <div className="chat-div">
          <img className="user-pfp" src="/profiles/user_c.jpeg" />
          <div>
            <h4>Beth Williams</h4>
            <p>I’m looking for tips around capturing the milky way. I have a 6D with a 24-100mm...</p>
          </div>
        </div>
        <div className="chat-div">
          <img className="user-pfp" src="/profiles/user_d.jpeg" />
          <div>
            <h4>Rev Shawn</h4>
            <p>Wanted to ask if you’re available for a portrait shoot next week.</p>
          </div>
        </div>
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

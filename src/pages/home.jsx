import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { motion } from 'framer-motion'

export default function Home() {
  const [signup, setSignup] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  const location = useLocation()
  const navigate = useNavigate()
  const dashboard = location.state?.from || '/dashboard'
  const auth = getAuth()

  function logIn(e) {
    e.preventDefault()
    if (formData.username && formData.password) {
      setStatus('submitting')
      signInWithEmailAndPassword(auth, formData.username, formData.password)
        .then(() => {
          setError(null)
          navigate(dashboard, { replace: true })
        })
        .catch((error) => {
          console.log(error.message)
          setError('Invalid username or password.')
        })
        .finally(() => {
          setStatus('idle')
        })
    } else {
      setError('Please enter your username and password.')
    }
  }

  function signUp(e) {
    e.preventDefault()
    if (formData.username && formData.password) {
      setStatus('submitting')
      createUserWithEmailAndPassword(auth, formData.username, formData.password)
        .then(() => {
          setError(null)
          navigate(dashboard, { replace: true })
        })
        .catch((error) => {
          console.log(error.message)
          setError('Something went wrong, please try again.')
        })
        .finally(() => {
          setStatus('idle')
        })
    } else {
      setError('Please enter your username and password.')
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function swap() {
    setSignup((prev) => !prev)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate(dashboard, { replace: true })
      }
    })
  }, [])

  return (
    <>
      <div className="splash-screen">
        <img className="splash-logo" src="/logo.png" />
      </div>
      <div className="splash-buttons">
        <Link to="login">LOG IN</Link>
        <Link to="login">REGISTER</Link>
      </div>
    </>
  )
}

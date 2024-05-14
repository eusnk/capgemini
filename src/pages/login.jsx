import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { motion } from 'framer-motion'

export default function Login() {
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
      <div className="card">
        <h1>Log In</h1>
        {signup ? (
          <form onSubmit={logIn} className="login-form">
            <input
              name="username"
              onChange={handleChange}
              type="email"
              placeholder="email address"
              value={setFormData.username}
            />
            <input
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="••••••••"
              minLength={8}
              value={setFormData.password}
            />
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.9 }} disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Please wait...' : 'LOG IN'}
            </motion.button>
            {error ? <h3 className="display-error">{error}</h3> : null}
            <p>
              Don't have an account? <u onClick={swap}>Sign up</u>
            </p>
          </form>
        ) : (
          <form onSubmit={signUp} className="login-form">
            <input
              name="username"
              onChange={handleChange}
              type="email"
              placeholder="enter your email address"
              value={setFormData.username}
            />
            <input
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="create a password (min. 8 characters)"
              minLength={8}
              value={setFormData.password}
            />
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.9 }} disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Please wait...' : 'Create account'}
            </motion.button>
            {error ? <h3 className="display-error">{error}</h3> : null}
            <p>
              Already have an account? <u onClick={swap}>Log in</u>
            </p>
          </form>
        )}
      </div>
    </>
  )
}

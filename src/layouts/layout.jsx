import { Outlet } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import { motion } from 'framer-motion'

export default function Layout() {
  const auth = getAuth()
  const user = auth.currentUser

  const location = useLocation()
  const navigate = useNavigate()
  const login = location.state?.from || '/'

  function logOut() {
    signOut(auth)
      .then(() => {
        navigate(home, { replace: true })
      })
      .catch((error) => {
        setError(error.message)
      })
  }

  return (
    <div className="container">
      <nav></nav>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signOut, updateProfile } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { motion } from 'framer-motion'
import { FaHeart, FaHome, FaRegUserCircle } from 'react-icons/fa'
import { CiSearch, CiChat1 } from 'react-icons/ci'

export default function Customize() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)

  const auth = getAuth()
  const user = auth.currentUser
  const storage = getStorage()

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

  function handleUpload(e) {
    e.preventDefault()
    const imageRef = ref(storage, 'img/' + user.uid)
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          updateProfile(auth.currentUser, {
            photoURL: url,
          })
          console.log('photo updated to ' + url)
        })
        .catch((error) => {
          setError('There was an error while uploading your file, please try again.')
          setError(error.message)
        })
        .finally(() => {
          setTimeout(() => {
            navigate(0)
          }, 100)
        })
      setImage(null)
    })
  }

  function handleChange(e) {
    if (e.target.files[0] && e.target.files[0].size < 4194304) {
      setImage(e.target.files[0])
      const previewImage = URL.createObjectURL(e.target.files[0])
      setPreview(previewImage)
    } else {
      alert('Uh oh! Your image file size is too big! Our limit is 4MB.')
    }
  }

  return loading ? (
    <h2 className="loading">Loading...</h2>
  ) : (
    <div className="card">
      {error ? <h3 className="display-error">{error}</h3> : null}
      <div className="profile-mockup">
        <div>
          <form className="profile-picture">
            <label htmlFor="upload-button" className="upload-button">
              <motion.img
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.9 }}
                className="avatar-pf"
                src={preview ? preview : user.photoURL ? user.photoURL : '/avatar.png'}
              />
            </label>
            <input type="file" id="upload-button" accept="image/*" onChange={handleChange} />
            {preview ? (
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.9 }} onClick={handleUpload}>
                Update Profile Picture
              </motion.button>
            ) : (
              <div className="disabled-button">Select a Photo</div>
            )}
          </form>
          <div className="profile-page">
            <p>Click on the photo change your avatar</p>
            <h2>{user.displayName ? user.displayName : user.email}</h2>
          </div>
          <div className="splash-buttons">
            <div className="follow">FOLLOW</div>
          </div>
          <div className="splash-buttons">
            <div className="message">MESSAGE</div>
          </div>
          <div className="masonry-pf">
            <img className="masonry-photo-pf" src="/photos/1.jpeg" />
            <img className="masonry-photo-pf" src="/photos/2.jpeg" />
            <img className="masonry-photo-pf" src="/photos/3.jpeg" />
            <img className="masonry-photo-pf" src="/photos/4.jpeg" />
            <img className="masonry-photo-pf" src="/photos/5.jpeg" />
            <img className="masonry-photo-pf" src="/photos/6.jpeg" />
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
      </div>
    </div>
  )
}

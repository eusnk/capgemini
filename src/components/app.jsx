import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { app } from '/services/firebase'
import Layout from '/layouts/layout'
import Home from '/pages/home'
import Login from '/pages/login'
import Dashboard from '/pages/dashboard'
import Search from '/pages/search'
import Chat from '/pages/chat'
import Customize from '/pages/customize'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="search" element={<Search />} />
          <Route path="chat" element={<Chat />} />
          <Route path="customize" element={<Customize />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

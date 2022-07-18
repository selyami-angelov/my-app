import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import ShellBar from './components/Shellbar/Shellbar.js'
import { AuthContext } from './context/AuthContext.js'
import { RequireAuth } from './hoc/RequireAuth.js'
import AdPage from './pages/ad-page/ad-page.js'
import AddAd from './pages/create-ad/create-ad.js'
import Home from './pages/home/home'
import LoginPage from './pages/login-register/login-register.js'

function App() {
  const { currentUser } = useContext(AuthContext)
  console.log(currentUser, 'asd')
  return (
    <Router>
      <ShellBar></ShellBar>
      <Routes>
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/'} element={<Home />} />
        <Route path={'/home'} element={<Home />} />
        <Route
          path={'/add-ad'}
          element={
            <RequireAuth>
              <AddAd />
            </RequireAuth>
          }
        />
        <Route path={'/ad/:adId'} element={<AdPage />} />
      </Routes>
    </Router>
  )
}

export default App

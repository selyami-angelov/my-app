import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import ShellBar from './components/Shellbar/Shellbar.js'
import AddAd from './pages/add-ad/add-ad.js'
import Home from './pages/home/home'

function App() {
  return (
    <Router>
      <ShellBar></ShellBar>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/home'} element={<Home />} />
        <Route path={'/add-ad'} element={<AddAd />} />
      </Routes>
    </Router>
  )
}

export default App

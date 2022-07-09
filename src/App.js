import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"
import Home from "./pages/home/home";
import AddAd from "./pages/add-ad/add-ad.js";
import ShellBar from './components/Shellbar/Shellbar.js';



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

export default App;

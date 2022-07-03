import React from 'react'
import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/home/home";
import "bootstrap/dist/css/bootstrap.min.css"
import AddAd from "./pages/add-ad/add-ad.js";

const addAd = <AddAd />
const home = <Home/>

function App() {
  return  <Home/>;
}

export default App;

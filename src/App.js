import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import ShellBar from './components/Shellbar/Shellbar.js'
import { AuthContext } from './context/AuthContext.js'
import { RequireAuth } from './hoc/RequireAuth.js'
import ProductPage from './pages/product-page/product-page.js'
import CreateProduct from './pages/create-product/create-product.js'
import Home from './pages/home/home'
import LoginPage from './pages/login-register/login-register.js'
import Products from './pages/products/Producs.js'

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
          path={'/create-ad'}
          element={
            <RequireAuth>
              <CreateProduct />
            </RequireAuth>
          }
        />
        <Route path={'/product/:productId'} element={<ProductPage />} />
        <Route
          path={'/products/:category/:subcategory'}
          element={<Products />}
        />
        <Route path={'/products/:city'} element={<Products />} />
      </Routes>
    </Router>
  )
}

export default App

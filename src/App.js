import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import ShellBar from './components/Shellbar/Shellbar.js'
import { AuthContext } from './context/AuthContext.js'
import { RequireAuth } from './hoc/RequireAuth.js'
import ProductPage from './pages/product-page/product-page.js'
import CreateProduct from './pages/create-product/create-product.js'
import EditProduct from './pages/edit-product/edit-product'
import Home from './pages/home/home'
import LoginPage from './pages/login-register/login-register.js'
import Products from './pages/products/Producs.js'
import UserProducts from './pages/user-products/user-products.js'
import { FormErrorsContextProvider } from './context/FormErrorsContext.js'
import { FormContextProvider } from './context/FormContext.js'

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
        <Route
          path={'/edit-product/:productId'}
          element={
            <FormErrorsContextProvider>
              <FormContextProvider>
                <EditProduct />
              </FormContextProvider>
            </FormErrorsContextProvider>
          }
        />
        <Route path={'/product/:productId'} element={<ProductPage />} />
        <Route
          path={'/products/:category/:subcategory'}
          element={<Products />}
        />
        <Route path={'/user-products'} element={<UserProducts />} />
      </Routes>
    </Router>
  )
}

export default App

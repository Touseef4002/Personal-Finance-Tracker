import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Home from './pages/Dashboard/Home'
import Income from './pages/Dashboard/Income'
import Expense from './pages/Dashboard/Expense'
import UserProvider from './context/userContext'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Root />} />
            <Route path='/login' exact element={<Login />} />
            <Route path='/signUp' exact element={<Signup />} />
            <Route path='/dashboard' exact element={<Home />} />
            <Route path='/Income' exact element={<Income />} />
            <Route path='/Expense' exact element={<Expense />} />
          </Routes>
        </Router>
      </div>

      <Toaster
        toastOptions={{
          className: '',
          style: {
            fontSize: "13px"
          },
        }}
      />
    </UserProvider>
  )
}

export default App

const Root = () => {
  //check if token exists
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ?
    <Navigate to="/dashboard" /> :
    <Navigate to="/login" />
};
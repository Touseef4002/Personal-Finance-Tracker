import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Home from './pages/Dashboard/Home'
import Income from './pages/Dashboard/Income'
import Expense from './pages/Dashboard/Expense'

const App = () => {
  return (
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
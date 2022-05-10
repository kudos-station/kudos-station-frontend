import React, { useState, useEffect } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/login.component'
import ForgotPassword from './components/forgotpassword.component'
import MainPage from './components/mainpage.component'
import Navbar from './components/Navbar/navbar.component'



function App() {
  const [currentNavbar, setCurrentNavbar] = useState(null);

   const activateNavbar = () => {
    setCurrentNavbar(<Navbar />)
  };

  useEffect(() => {
    if(!(window.location.pathname === "/login")){
      activateNavbar()
    }

}, [window.location.pathname]);

  return (
    <Router>
      <div className="App">
        {currentNavbar}
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<MainPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/home" element={<MainPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}
export default App
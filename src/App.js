import React, { useState, useEffect } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './styles.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/login.component'
import MainPage from './components/Mainpage/mainpage.component'
import Navbar from './components/Navbar/navbar.component'
import CreateNewKudos from './components/Mainpage/createnewkudos.component'
import Profile from './components/profile.component'
import Filter from './components/FilterPage/filter.component'
import KudosByDepartment from './components/FilterPage/kudosByDepartment.component'
import UsersByDepartment from './components/FilterPage/usersByDepartment.component'
import UsersProjectWithMaxKudos from './components/FilterPage/usersProjectWithMaxKudos.component'
import UsersByProject from './components/FilterPage/usersByProject.component'
import SearchedProfile from './components/searchedProfile.component'
import UsersByKudos from './components/FilterPage/usersByKudos.component'

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
              <Route path="/home" element={<MainPage />} />
              <Route path="/send-kudos" element={<CreateNewKudos />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/filter" element={<Filter />} />
              <Route path="/kudosByDepartment" element={<KudosByDepartment />} />
              <Route path="/usersByDepartment" element={<UsersByDepartment />} />
              <Route path="/usersProjectWithMaxKudos" element={<UsersProjectWithMaxKudos />} />
              <Route path="/usersByProject" element={<UsersByProject />} />
              <Route path="/searchedProfile" element={<SearchedProfile />} />
              <Route path="/usersByKudos" element={<UsersByKudos />} />

            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}
export default App
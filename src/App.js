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
import AdminPanel from './components/AdminPanelPage/admin-panel.component'
import AddUser from './components/AdminPanelPage/adduser.component'
import ChangeUserRole from './components/AdminPanelPage/changeuserrole.component'


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
              <Route path="/admin-panel" element={<AdminPanel />} />
              <Route path="/admin-panel/add-user" element={<AddUser />} />
              <Route path="/admin-panel/change-user-role" element={<ChangeUserRole />} />
              

              
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}
export default App
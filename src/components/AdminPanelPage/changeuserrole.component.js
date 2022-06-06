import React, { useState } from 'react'
import "../../styles.css";
import {  getCookie } from '../cookie-functions';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


const ChangeUserRole = () => {
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();

  const fetchUser = async (encoded) => {
    const requestOptions = {
      method: 'GET',
      headers: {'Authorization': encoded},
    };
    const base_url = process.env.REACT_APP_KUDOS_BASE_URL
    console.log(base_url)
    const res = await fetch(base_url + '/user/profile/', requestOptions)
    if(res.status === 401){
      console.log('unauth')
      setErrorMessages({name: "pass", message: errors.pass})
      setInterval(() => {
        setErrorMessages({name: "noerror", message: errors.noerror})
      }, 3000)
    }else{
      
      navigate("/home");
      window.location.reload();
    }
  }

  const errors = {
    noerror : "",
    pass: "Invalid username or password"
  };

  const changeRole = async (userName, authority) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Authorization': getCookie('kudos-auth'), 'Content-Type': 'application/json'},
      body: JSON.stringify({"username": userName, "authority":authority})
    };
    const base_url = process.env.REACT_APP_KUDOS_BASE_URL
    const res = await fetch(base_url + '/admin/update-user-role', requestOptions)
    //const data = await res.json()
    //
    if(res.status === 200){
      console.log("successful")
      navigate("/admin-panel");
      
    }else{
      console.log("failed")
      
    }
  }

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    
    var uname = document.getElementById("userName").value;

    var auth="ROLE_ADMIN"
    if(document.getElementById('admin').checked) {
      auth = document.getElementById("admin").value;
    }else if(document.getElementById('user').checked) {
      auth = document.getElementById("user").value;
    }

    
    
    console.log(uname)
    console.log(auth)
    console.log(JSON.stringify({"username": uname, "authority":auth}))
    
    changeRole(uname, auth)
    
  };

  /* const renderErrorMessage = (name) =>
  name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    ); */

    return (
      <div className='container-all d-change-role'>
          <h3 className='add-user-title'>Change User Role</h3>
          <hr className='hr-add-user'></hr>
          


        
        <form onSubmit={handleSubmit}>
            <label htmlFor='users' className='lbl-change-role'>Change role of:</label>
            <br></br>
            <input
            type="text"
            className="form-control"
            placeholder=""
            name = "sname"
            autoComplete = "on"
            id='userName'
            required
          />
            <h6 className='change-role-h3'>to</h6>
            {/* <input
            type="text"
            className="form-control"
            placeholder=""
            name = "sname"
            autoComplete = "on"
            required
          /> */}
          
          
            <input type="radio" id="admin" name="ROLE" value="ROLE_ADMIN"  defaultChecked="true"/>
            <label htmlFor="admin">Admin</label>
            <input type="radio" id="user" name="ROLE" value="ROLE_USER" />
            <label htmlFor="user">User</label><br></br>
            <button type='submit' className='btn btn-outline-primary btn-change-role'>Change Role</button>
        </form>
        
      
          
        
        
      </div>

    
        
      
    );
  };


export default ChangeUserRole;
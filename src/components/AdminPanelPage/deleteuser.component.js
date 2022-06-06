import React, { useState } from 'react'
import "../../styles.css";
import {  getCookie } from '../cookie-functions';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


const DeleteUser = () => {
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

  const deleteUser = async (userName) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Authorization': getCookie('kudos-auth'), 'Content-Type': 'application/json'},
      
      //body: JSON.stringify({"username": userName, "authority":authority})
    };
    const base_url = process.env.REACT_APP_KUDOS_BASE_URL
    console.log(userName);
    const res = await fetch(base_url + '/admin/delete-user/' + userName, requestOptions)
    //const data = await res.json()
    //
    if(res.status === 200){
      console.log("successful")
      
    }else{
      console.log("failed")
      
    }
  }

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var uname = document.getElementById("userName").value;

    
    console.log(uname)
    deleteUser(uname)
  };

  

  /* const renderErrorMessage = (name) =>
  name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    ); */

    return (
      <div className='container-all d-change-role'>
          <h3 className='add-user-title'>Delete User</h3>
          <hr className='hr-add-user'></hr>
          <form onSubmit={handleSubmit}>
        
        <div className="mb-3">
        <label>Delete user:</label>
        <input
            type="text"
            className="form-control"
            placeholder=""
            name = "uname"
            autoComplete = "on"
            id='userName'
            required
          />
          
        </div>
       
        <div className="d-grid">
          <button type="submit" className="btn btn-danger btn-add-user">
            Delete User
          </button>
        </div>
        
      </form>
          
        
        
      </div>

    
        
      
    );
  };


export default DeleteUser;
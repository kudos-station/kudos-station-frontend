import React from 'react'
import "../../styles.css";
import {  getCookie } from '../cookie-functions';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';


const AddUser = () => {

  const navigate = useNavigate();
  useEffect(() => {
    if(!getCookie('kudos-auth')){    
        navigate("/login");
    }
},[])

  const addUser = async (name, surname, userName, password, authority) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Authorization': getCookie('kudos-auth'), 'Content-Type': 'application/json'},
      body: JSON.stringify({"firstName": name, "lastName": surname, "username": userName, "password": password, "authority":authority})
    };
    const base_url = process.env.REACT_APP_KUDOS_BASE_URL
    const res = await fetch(base_url + '/admin/create-user', requestOptions)

    if(res.status === 201){
      Swal.fire({
        title: 'Success!',
        text: 'User has been created.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#167bff'
      })      
    }else{
      Swal.fire({
        title: 'Failed!',
        text: 'Creating user has failed.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#167bff'
      })   
    }
  }

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    
    //var { name, sname, uname, pass, auth } = document.forms[1];
    var name = document.getElementById("namefield").value;
    var sname = document.getElementById("surnamefield").value;
    var uname = document.getElementById("usernamefield").value;
    var pass = document.getElementById("passwordfield").value;

    var auth="ROLE_ADMIN"
    if(document.getElementById('admin').checked) {
      auth = document.getElementById("admin").value;
    }else if(document.getElementById('user').checked) {
      auth = document.getElementById("user").value;
    }
    addUser(name, sname, uname, pass, auth)
       
  };
    return (
      <div className='container-all'>
          <h3 className='add-user-title'>Create New User</h3>
          <hr className='hr-add-user'></hr>
          <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            name = "name"
            id='namefield'
            required
          />
        </div>
        <div className="mb-3">
          <label>Surname</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            name = "sname"
            id='surnamefield'
            autoComplete = "on"
            required
          />
          
        </div>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            name = "uname"
            id='usernamefield'
            autoComplete = "on"
            required
          />
          
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder=""
            name = "pass"
            id='passwordfield'
            autoComplete = "on"
            required
          />
          
        </div>

        <div className="mb-3">
          <label>Authority</label>
        <br></br>
         
         <div className='center-radio-btn'>
           <input type="radio" id="admin" name="ROLE" value="ROLE_ADMIN"  />
            <label htmlFor="admin">Admin</label>
            <input type="radio" id="user" name="ROLE" value="ROLE_USER" defaultChecked="true"/>
            <label htmlFor="user">User</label><br></br>
        </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary btn-add-user">
          Create New User
          </button>
        </div>
        
      </form>     
      </div>      
      
    );
  };


export default AddUser;
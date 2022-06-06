import React, { useState } from 'react'
import "../../styles.css";
import {  getCookie } from '../cookie-functions';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


const AddUser = () => {
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();

 

  const addUser = async (name, surname, userName, password, authority) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Authorization': getCookie('kudos-auth'), 'Content-Type': 'application/json'},
      body: JSON.stringify({"firstName": name, "lastName": surname, "username": userName, "password": password, "authority":authority})
    };
    
    
    
    const base_url = process.env.REACT_APP_KUDOS_BASE_URL
    console.log(process.env.REACT_APP_KUDOS_BASE_URL + "     :Base url");    
    console.log(getCookie('kudos-auth') + "          :cookie");
    
    const res = await fetch(base_url + '/admin/create-user', requestOptions)
    //const data = await res.json()
    //
    if(res.status === 201){
      console.log("successful")
      
    }else{
      console.log("failed")
      console.log(res.status);
    }
  }

  const errors = {
    noerror : "",
    pass: "Invalid username or password"
  };

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
    
    
    console.log(JSON.stringify({"firstName": name, "lastName": sname, "username": uname, "password": pass, "authority":auth}))
    addUser(name, sname, uname, pass, auth)
    
    
  };

  /* const renderErrorMessage = (name) =>
  name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    ); */

    return (
      <div className='container-all'>
          <h3 className='add-user-title'>Add New User</h3>
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
          <label>User Name</label>
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
          <label>Authority:</label>
        <br></br>
          {/* <input
            type="text"
            className="form-control"
            placeholder=""
            name = "auth"
            autoComplete = "on"
            required
          /> */}
           <input type="radio" id="admin" name="ROLE" value="ROLE_ADMIN"  defaultChecked="true"/>
            <label htmlFor="admin">Admin</label>
            <input type="radio" id="user" name="ROLE" value="ROLE_USER" />
            <label htmlFor="user">User</label><br></br>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary btn-add-user">
            Add New User
          </button>
        </div>
        
      </form>
          
        
        
      </div>

    
        
      
    );
  };


export default AddUser;
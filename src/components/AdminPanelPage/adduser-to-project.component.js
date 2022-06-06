import React, { useState } from 'react'
import "../../styles.css";
import {  getCookie } from '../cookie-functions';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


const AddUserToProject = () => {
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

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    
    var userName = document.getElementById("username").value;
    var departmentName = document.getElementById("departmentname").value;
    var projectName = document.getElementById("projectname").value;
    var workHours = document.getElementById("workhours").value;

    console.log(userName);
    console.log(departmentName);
    console.log(projectName);
    console.log(workHours);
    
    console.log(JSON.stringify({"username": userName, "departmentName": departmentName, "projectName": projectName, "workHours":parseInt(workHours)}))
    assignUser(userName, departmentName, projectName, workHours)
    
  };

  const assignUser = async (userName, departmentName, projectName, workHours) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Authorization': getCookie('kudos-auth'), 'Content-Type': 'application/json'},
      body: JSON.stringify({"username": userName, "departmentName": departmentName, "projectName": projectName, "workHours":parseInt(workHours)})
    };
    const base_url = process.env.REACT_APP_KUDOS_BASE_URL
    const res = await fetch(base_url + '/admin/works-on/create-relation/', requestOptions)
    const data = await res.json()
    
    if(res.status === 201){
      console.log("successful")
      
    }else{
      console.log("failed")
      
    }
    
  }

  /* const renderErrorMessage = (name) =>
  name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    ); */

    return (
      <div className='container-all d-change-role'>
          <h3 className='add-user-title'>Assign User to Project</h3>
          <hr className='hr-add-user'></hr>
          


        
          <form onSubmit={handleSubmit}>
            
            <br></br>
           
            
            <input
            type="text"
            className="form-control"
            placeholder="User Name"
            name = "uname"
            autoComplete = "on"
            id='username'
            required
          />
          <input
            type="text"
            className="form-control"
            placeholder="Department Name"
            name = "uname"
            autoComplete = "on"
            id='departmentname'
            required
          />
          <input
            type="text"
            className="form-control"
            placeholder="Project Name"
            name = "uname"
            autoComplete = "on"
            id='projectname'
            required
          />
          <input
            type="text"
            className="form-control"
            placeholder="Work Hours"
            name = "uname"
            autoComplete = "on"
            id='workhours'
            required
          />
            <button type='submit' className='btn btn-primary btn-change-role'>Assign User to Project</button>
        </form>
        
      
          
        
        
      </div>

    
        
      
    );
  };


export default AddUserToProject;
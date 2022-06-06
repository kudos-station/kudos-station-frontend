import React, { useState } from 'react'
import "../../styles.css";
import "../AdminPanelPage/admin-panel.css";
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
      navigate("/admin-panel");
      
    }else{
      console.log("failed")
      
    }
    
  }

  /* const renderErrorMessage = (name) =>
  name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    ); */

    return (
      <div className='container-all'>
          <h3 className='add-user-title'>Assign User to Project</h3>
          <hr className='hr-add-user'></hr>
          


        
          <form onSubmit={handleSubmit}>
          <div className="mb-3">    
            
           
            <label>User Name</label>
            <input
            type="text"
            className="form-control"
            placeholder=""
            name = "uname"
            autoComplete = "on"
            id='username'
            required
          />
          </div>
          <div className="mb-3">
          <label>Department Name</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            name = "uname"
            autoComplete = "on"
            id='departmentname'
            required
          />
          </div>
          <div className="mb-3">
          <label>Project Name</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            name = "uname"
            autoComplete = "on"
            id='projectname'
            required
          />
          </div>
          <div className="mb-3">
          <label>Work Hours</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            name = "uname"
            autoComplete = "on"
            id='workhours'
            required
          />
          </div>
          <div className="d-grid">
            <button type='submit' className='btn btn-primary btn-add-user max-width'>Assign User to Project</button>
            </div>
        </form>
        
      
          
        
        
      </div>

    
        
      
    );
  };


export default AddUserToProject;
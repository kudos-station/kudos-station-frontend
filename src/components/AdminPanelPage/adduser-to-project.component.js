import React from 'react'
import "../../styles.css";
import "../AdminPanelPage/admin-panel.css";
import {  getCookie } from '../cookie-functions';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const AddUserToProject = () => {

  const navigate = useNavigate();
  useEffect(() => {
    if(!getCookie('kudos-auth')){    
        navigate("/login");
    }
},[])

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    
    var userName = document.getElementById("username").value;
    var departmentName = document.getElementById("departmentname").value;
    var projectName = document.getElementById("projectname").value;
    var workHours = document.getElementById("workhours").value;
    
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
    
    if(res.status === 201){
      Swal.fire({
        title: 'Success!',
        text: 'User has been assigned to project.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#167bff'
      }) 
      
    }else{
      Swal.fire({
        title: 'Failed!',
        text: 'Assigning user to project has failed.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#167bff'
      }) 
      
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
            
           
            <label>Username</label>
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
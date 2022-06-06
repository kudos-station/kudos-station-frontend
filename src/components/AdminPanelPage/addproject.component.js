import React from 'react'
import "../../styles.css";
import {  getCookie } from '../cookie-functions';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const AddProject = () => {

  const navigate = useNavigate();
  useEffect(() => {
    if(!getCookie('kudos-auth')){    
        navigate("/login");
    }
},[])

  const addProject = async (projectName, departmentName) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Authorization': getCookie('kudos-auth'), 'Content-Type': 'application/json'},
      body: JSON.stringify({"projectName": projectName, "departmentName":departmentName})
    };
    const base_url = process.env.REACT_APP_KUDOS_BASE_URL
    const res = await fetch(base_url + '/admin/project/create-project', requestOptions)
    //const data = await res.json()
    //
    if(res.status === 201){
      Swal.fire({
        title: 'Success!',
        text: 'Project has been created.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#167bff'
      }) 
    }else{
      Swal.fire({
        title: 'Failed!',
        text: 'Creating Project has failed.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#167bff'
      })       
    }
  }

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    
    var projectName = document.getElementById("pname").value;
    var departmentName = document.getElementById("dname").value;
    
    addProject(projectName, departmentName)
    
  };

    return (
      <div className='container-all'>
          <h3 className='add-user-title'>Create Project</h3>
          <hr className='hr-add-user'></hr>
          <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Project Name</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            name = "uname"
            required
            id='pname'
          />
        </div>
        <div className="mb-3">
          <label>Controlling Department Name</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            name = "uname"
            required
            id='dname'
          />
          
        </div>
       
        <div className="d-grid">
          <button type="submit" className="btn btn-primary btn-add-user">
          Create Project
          </button>
        </div>
        
      </form>
          
        
        
      </div>

    
        
      
    );
  };


export default AddProject;
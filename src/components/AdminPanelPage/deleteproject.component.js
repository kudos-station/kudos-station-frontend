import React from 'react'
import "../../styles.css";
import {  getCookie } from '../cookie-functions';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const DeleteProject = () => {

  const navigate = useNavigate();
  useEffect(() => {
    if(!getCookie('kudos-auth')){    
        navigate("/login");
    }
},[])

  const deleteProject = async (projectName) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Authorization': getCookie('kudos-auth'), 'Content-Type': 'application/json'},
      body: JSON.stringify({"projectName": projectName})
    };
    const base_url = process.env.REACT_APP_KUDOS_BASE_URL
    const res = await fetch(base_url + '/admin/project/delete-project/', requestOptions)

    if(res.status === 200){
      Swal.fire({
        title: 'Success!',
        text: 'Project has been deleted.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#167bff'
      }) 
    }else{
      Swal.fire({
        title: 'Failed!',
        text: 'Deleting the project has failed.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#167bff'
      }) 
      
    }
  }

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    var uname = document.getElementById("projectname").value;
    deleteProject(uname)
  };

    return (
      <div className='container-all'>
          <h3 className='add-user-title'>Delete Project</h3>
          <hr className='hr-add-user'></hr>
          <form onSubmit={handleSubmit}>
        
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
       
        <div className="d-grid">
          <button type="submit" className="btn btn-danger btn-add-user">
            Delete Project
          </button>
        </div>
        
      </form>
  
      </div>

    );
  };


export default DeleteProject;
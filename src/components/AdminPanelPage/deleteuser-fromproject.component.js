import React from 'react'
import "../../styles.css";
import {  getCookie } from '../cookie-functions';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const RemoveUserFromProj = () => {

  const navigate = useNavigate();
  useEffect(() => {
    if(!getCookie('kudos-auth')){    
        navigate("/login");
    }
},[])

  const deleteUser = async (userName, projectName) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Authorization': getCookie('kudos-auth'), 'Content-Type': 'application/json'},
      body: JSON.stringify({"username": userName, "projectName": projectName})
    };
    const base_url = process.env.REACT_APP_KUDOS_BASE_URL
    const res = await fetch(base_url + '/admin/works-on/delete', requestOptions)

    if(res.status === 200){
      Swal.fire({
        title: 'Success!',
        text: 'User has been removed from project.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#167bff'
      }) 
    }else{
      Swal.fire({
        title: 'Failed!',
        text: 'Removing the user from project has failed.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#167bff'
      }) 
      
    }
  }

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    var uname = document.getElementById("userName").value;
    var pname = document.getElementById("projectName").value;
    deleteUser(uname, pname)
  };

    return (
      <div className='container-all'>
          <h3 className='add-user-title'>Remove User from Project</h3>
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
            id='userName'
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
            id='projectName'
            required
          />
          
        </div>
       
        <div className="d-grid">
          <button type="submit" className="btn btn-danger btn-add-user">
            Remove User from Project
          </button>
        </div>
        
      </form>
  
      </div>

    );
  };


export default RemoveUserFromProj;
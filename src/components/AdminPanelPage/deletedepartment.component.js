import React from 'react'
import "../../styles.css";
import {  getCookie } from '../cookie-functions';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const DeleteDepartment = () => {

    const navigate = useNavigate();
  useEffect(() => {
    if(!getCookie('kudos-auth')){    
        navigate("/login");
    }
},[])

  const deleteDepartment = async (depName) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Authorization': getCookie('kudos-auth'), 'Content-Type': 'application/json'},
      body: JSON.stringify({"departmentName": depName})
    };
    const base_url = process.env.REACT_APP_KUDOS_BASE_URL
    const res = await fetch(base_url + '/admin/department/delete-department', requestOptions)

    if(res.status === 200){
      Swal.fire({
        title: 'Success!',
        text: 'Department has been deleted.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#167bff'
      }) 
    }else{
      Swal.fire({
        title: 'Failed!',
        text: 'Deleting the department has failed.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#167bff'
      }) 
      
    }
  }

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    var depName = document.getElementById("departmentName").value;
    deleteDepartment(depName)
  };

    return (
      <div className='container-all'>
          <h3 className='add-user-title'>Delete Department</h3>
          <hr className='hr-add-user'></hr>
          <form onSubmit={handleSubmit}>
        
        <div className="mb-3">
        <label>Department Name</label>
        <input
            type="text"
            className="form-control"
            placeholder=""
            name = "uname"
            autoComplete = "on"
            id='departmentName'
            required
          />
          
        </div>
       
        <div className="d-grid">
          <button type="submit" className="btn btn-danger btn-add-user">
            Delete Department
          </button>
        </div>
        
      </form>
  
      </div>

    );
  };


export default DeleteDepartment;
import React from 'react'
import "../../styles.css";
import {  getCookie } from '../cookie-functions';
import Swal from 'sweetalert2'


const AddDepartment = () => {

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    
    var department_name = document.getElementById("department_name").value;
    var manager_name = document.getElementById("manager_name").value; 
    addDepartment(department_name, manager_name)   
    
  };

  const addDepartment = async (departmentName, managerName) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Authorization': getCookie('kudos-auth'), 'Content-Type': 'application/json'},
      body: JSON.stringify({"departmentName": departmentName, "managerName": managerName})
    };
    const base_url = process.env.REACT_APP_KUDOS_BASE_URL
    const res = await fetch(base_url + '/admin/department/create-department/', requestOptions)
    if(res.status === 201){
      Swal.fire({
        title: 'Success!',
        text: 'Department has been added.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#167bff'
      }) 
    }else{
      Swal.fire({
        title: 'Failed!',
        text: 'Adding department has failed.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#167bff'
      }) 
    }
  }

    return (
      <div className='container-all'>
          <h3 className='add-user-title'>Add Department</h3>
          <hr className='hr-add-user'></hr>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Department Name</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            name = "uname"
            id='department_name'
            required
          />
        </div>
        <div className="mb-3">
          <label>Manager Name</label>
          <input
          type="text"
          className="form-control"
          placeholder=""
          name = "mid"
          id='manager_name'
          required/>
          
          
        </div>
       
        <div className="d-grid">
          <button type="submit" className="btn btn-primary btn-add-user">
            Add Department
          </button>
        </div>
        
      </form>
          
        
        
      </div>

    
        
      
    );
  };


export default AddDepartment;
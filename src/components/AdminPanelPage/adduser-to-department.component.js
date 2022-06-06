import React from 'react'
import "../../styles.css";
import {  getCookie } from '../cookie-functions';
import Swal from 'sweetalert2';


const AddUserToDepartment = () => {

  const addUserToProject = async (username, departmentname) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Authorization': getCookie('kudos-auth'), 'Content-Type': 'application/json'},
      body: JSON.stringify({"username": username, "departmentName": departmentname})
    };
    const base_url = process.env.REACT_APP_KUDOS_BASE_URL
    const res = await fetch(base_url + '/admin/works-in/create-relation/', requestOptions)
    if(res.status === 201){
      Swal.fire({
        title: 'Success!',
        text: 'User has been assigned to department.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#167bff'
      }) 
      
    }else{
      Swal.fire({
        title: 'Failed!',
        text: 'Adding user to project has failed.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#167bff'
      }) 
      
    }
  }

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    
    var user_name = document.getElementById("username").value;
    var department_name = document.getElementById("departmentname").value;

    console.log(user_name)
    console.log(department_name)
    console.log(JSON.stringify({"username": user_name, "departmentName":department_name}))
    
    addUserToProject(user_name, department_name)
    
    
  };

  

    return (
      <div className='container-all'>
          <h3 className='add-user-title'>Add User to Department</h3>
          <hr className='hr-add-user'></hr>
          <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>User Name</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            name = "uname"
            required
            id='username'
          />
        </div>
        <div className="mb-3">
          <label>Department Name</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            name = "uname"
            required
            id='departmentname'
          />
          
        </div>
       
        <div className="d-grid">
          <button type="submit" className="btn btn-primary btn-add-user">
            Add User to Department
          </button>
        </div>
        
      </form>   
      </div>  
    );
  };


export default AddUserToDepartment;
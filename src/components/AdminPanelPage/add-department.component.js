import React, { useState } from 'react'
import "../../styles.css";
import {  getCookie } from '../cookie-functions';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';



const AddDepartment = () => {
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
    console.log(departmentName)
    console.log(managerName)
    const res = await fetch(base_url + '/admin/project/create-department/', requestOptions)
    //const data = await res.json()
    //
    if(res.status === 201){
      console.log("successful")
      
    }else{
      console.log("failed")
      
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
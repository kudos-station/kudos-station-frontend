import React, { useState } from 'react'
import "../../styles.css";
import { setCookie, getCookie } from '../cookie-functions';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


const AddUserToDepartment = () => {
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
      setCookie('kudos-auth', encoded, 1)
      navigate("/home");
      window.location.reload();
    }
  }

  const errors = {
    noerror : "",
    pass: "Invalid username or password"
  };

  const addUserToProject = async (username, departmentname) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Authorization': getCookie('kudos-auth'), 'Content-Type': 'application/json'},
      body: JSON.stringify({"username": username, "departmentName": departmentname})
    };
    const base_url = process.env.REACT_APP_KUDOS_BASE_URL
    const res = await fetch(base_url + '/admin/works-in/create-relation/', requestOptions)
    //const data = await res.json()
    //
    if(res.status === 200){
      console.log("successful")
      
    }else{
      console.log("failed")
      
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
    
    addUserToProject(user_id, department_id)
    
    
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
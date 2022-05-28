import React, { useState } from 'react'
import "../../styles.css";
import { setCookie, getCookie } from '../cookie-functions';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


const AddProject = () => {
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

  const addProject = async (pname, dep_id) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Authorization': getCookie('kudos-auth'), 'Content-Type': 'application/json'},
      body: JSON.stringify({"project-name": pname, "department-id":parseInt(dep_id)})
    };
    const base_url = process.env.REACT_APP_KUDOS_BASE_URL
    const res = await fetch(base_url + '/admin/project/create-project/' + pname + '/' + parseInt(dep_id), requestOptions)
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
    
    var projectName = document.getElementById("pname").value;
    var departmend_id = document.getElementById("did").value;

    

    
    
    console.log(projectName)
    console.log(departmend_id)
    //console.log(JSON.stringify({"username": uname, "authority":auth}))
    
    addProject(projectName, departmend_id)
    
    
  };

  /* const renderErrorMessage = (name) =>
  name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    ); */

    return (
      <div className='container-all'>
          <h3 className='add-user-title'>Add Project</h3>
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
          <label>Controlling Department ID</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            name = "uname"
            required
            id='did'
          />
          
        </div>
       
        <div className="d-grid">
          <button type="submit" className="btn btn-primary btn-add-user">
            Add Project
          </button>
        </div>
        
      </form>
          
        
        
      </div>

    
        
      
    );
  };


export default AddProject;
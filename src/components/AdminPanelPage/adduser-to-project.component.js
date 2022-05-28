import React, { useState } from 'react'
import "../../styles.css";
import { setCookie, getCookie } from '../cookie-functions';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


const AddUserToProject = () => {
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

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    
    var userID = document.getElementById("user_id").value;
    var departmentID = document.getElementById("dep_id").value;
    var projectID = document.getElementById("project_id").value;
    var workHours = document.getElementById("work_hours").value;

    console.log(userID);
    console.log(departmentID);
    console.log(projectID);
    console.log(workHours);
    
    //console.log(JSON.stringify({"username": uname, "authority":auth}))
    assignUser(userID, departmentID, projectID, workHours)
    
  };

  const assignUser = async (userID, departmentID, projectID, workHours) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Authorization': getCookie('kudos-auth'), 'Content-Type': 'application/json'},
      //body: JSON.stringify({"project-name": pname, "department-id":parseInt(dep_id)})
    };
    const base_url = process.env.REACT_APP_KUDOS_BASE_URL
    const res = await fetch(base_url + '/admin/works-on/create-relation/' + parseInt(userID) + '/' + parseInt(departmentID) + '/' + parseInt(projectID) + '/' + parseInt(workHours), requestOptions)
    const data = await res.json()
    
    if(res.status === 200){
      console.log("successful")
      
    }else{
      console.log("failed")
      
    }
    console.log(userID, departmentID, projectID, workHours)
  }

  /* const renderErrorMessage = (name) =>
  name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    ); */

    return (
      <div className='container-all d-change-role'>
          <h3 className='add-user-title'>Assign User to Project</h3>
          <hr className='hr-add-user'></hr>
          


        
          <form onSubmit={handleSubmit}>
            
            <br></br>
           
            
            <input
            type="text"
            className="form-control"
            placeholder="User ID"
            name = "uname"
            autoComplete = "on"
            id='user_id'
            required
          />
          <input
            type="text"
            className="form-control"
            placeholder="Department ID"
            name = "uname"
            autoComplete = "on"
            id='dep_id'
            required
          />
          <input
            type="text"
            className="form-control"
            placeholder="Project ID"
            name = "uname"
            autoComplete = "on"
            id='project_id'
            required
          />
          <input
            type="text"
            className="form-control"
            placeholder="Work Hours"
            name = "uname"
            autoComplete = "on"
            id='work_hours'
            required
          />
            <button type='submit' className='btn btn-primary btn-change-role'>Assign User to Project</button>
        </form>
        
      
          
        
        
      </div>

    
        
      
    );
  };


export default AddUserToProject;
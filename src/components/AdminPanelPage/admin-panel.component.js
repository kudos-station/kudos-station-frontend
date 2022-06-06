import React, { useState } from 'react'
import "../../styles.css";

import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


const AdminPanel = () => {
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();

  

  const errors = {
    noerror : "",
    pass: "Invalid username or password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    
  };

  /* const renderErrorMessage = (name) =>
  name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    ); */

    return (
      <div className='container-all'>
          <h3>Admin View</h3>
          <Link to="add-user">
          <div className="mb-3">
          <button className='btn btn-primary btn-ap'>Add User</button>
        </div>
        </Link>

        <Link to="add-department">
        <div className="mb-3">
          <button className='btn btn-primary btn-ap'>Add Department</button>
        </div>
        </Link>

        <Link to="add-project">
        <div className="mb-3">
          <button className='btn btn-primary btn-ap'>Add Project</button>
        </div>
        </Link>

        <Link to="add-user-to-department">
          <div className="mb-3">
          <button className='btn btn-primary btn-ap'>Add User to Department</button>
        </div>
        </Link>

        <Link to="assign-user-to-project">
        <div className="mb-3">
          <button className='btn btn-primary btn-ap'>Assign User to Project</button>
        </div>
        </Link>
        
        <Link to="change-user-role">
        <div className="mb-3">
          <button className='btn btn-outline-primary btn-ap'>Change User Role</button>
        </div>
        </Link>
        

        <Link to="delete-user">
        <div className="mb-3">
          <button className='btn btn-danger btn-ap'>Delete User</button>
        </div>
        </Link>

        <Link to="delete-project">
        <div className="mb-3">
          <button className='btn btn-danger btn-ap'>Delete Project</button>
        </div>
        </Link>

        <Link to="delete-departmentr">
        <div className="mb-3">
          <button className='btn btn-danger btn-ap'>Delete Department</button>
        </div>
        </Link>

        <Link to="delete-user-from-project">
        <div className="mb-3">
          <button className='btn btn-danger btn-ap'>Delete User From Project</button>
        </div>
        </Link>

        <Link to="delete-user-from-department">
        <div className="mb-3">
          <button className='btn btn-danger btn-ap'>Delete User From Department</button>
        </div>
        </Link>

        
        
        
        
        
      </div>

    
        
      
    );
  };


export default AdminPanel;
import React, { useState } from 'react'
import "../../styles.css";
import { setCookie, getCookie } from '../cookie-functions';
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
      setCookie('kudos-auth', encoded, 1)
      navigate("/home");
      window.location.reload();
    }
  }

  const errors = {
    noerror : "",
    pass: "Invalid username or password"
  };

  // const handleSubmit = (event) => {
  //   //Prevent page reload
  //   event.preventDefault();

  //   var { uname, pass } = document.forms[0];

  //   const combined = uname.value + ':' + pass.value;
  //   const encoded = 'Basic ' + window.btoa(combined)
  //   fetchUser(encoded)
  // };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    
    var department_name = document.getElementById("department_name").value;
    var manager_id = parseInt(document.getElementById("manager_id").value);
    
    
    addDepartment(department_name, manager_id)
    
    
  };

  const addDepartment = async (name, mng_id) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Authorization': getCookie('kudos-auth'), 'Content-Type': 'application/json'},
      //body: JSON.stringify({"firstName": name, "lastName": surname, "username": userName, "password": password, "authority":authority})
    };
    const base_url = process.env.REACT_APP_KUDOS_BASE_URL
    console.log(name)
    console.log(mng_id + 34)
    const res = await fetch(base_url + '/admin/project/create-department/' + name + "/" + mng_id, requestOptions)
    //const data = await res.json()
    //
    if(res.status === 200){
      console.log("successful")
      
    }else{
      console.log("failed")
      
    }
  }

  /* const renderErrorMessage = (name) =>
  name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    ); */

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
          <label>Manager ID</label>
          <input
          type="text"
          className="form-control"
          placeholder=""
          name = "mid"
          id='manager_id'
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
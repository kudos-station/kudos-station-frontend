import React from 'react'
import "../../styles.css";
import {  getCookie } from '../cookie-functions';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const DeleteUser = () => {

  const navigate = useNavigate();
  useEffect(() => {
    if(!getCookie('kudos-auth')){    
        navigate("/login");
    }
},[])

  const deleteUser = async (userName) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Authorization': getCookie('kudos-auth'), 'Content-Type': 'application/json'},
    };
    const base_url = process.env.REACT_APP_KUDOS_BASE_URL
    const res = await fetch(base_url + '/admin/delete-user/' + userName, requestOptions)

    if(res.status === 200){
      Swal.fire({
        title: 'Success!',
        text: 'User has been deleted.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#167bff'
      }) 
    }else{
      Swal.fire({
        title: 'Failed!',
        text: 'Deleting the user has failed.',
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
    deleteUser(uname)
  };

    return (
      <div className='container-all'>
          <h3 className='add-user-title'>Delete User</h3>
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
       
        <div className="d-grid">
          <button type="submit" className="btn btn-danger btn-add-user">
            Delete User
          </button>
        </div>
        
      </form>
  
      </div>

    );
  };


export default DeleteUser;
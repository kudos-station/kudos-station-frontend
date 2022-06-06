import React from 'react'
import "../../styles.css";
import {  getCookie } from '../cookie-functions';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';


const ChangeUserRole = () => {

  const navigate = useNavigate();
  useEffect(() => {
    if(!getCookie('kudos-auth')){    
        navigate("/login");
    }
},[])

  const changeRole = async (userName, authority) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Authorization': getCookie('kudos-auth'), 'Content-Type': 'application/json'},
      body: JSON.stringify({"username": userName, "authority":authority})
    };
    const base_url = process.env.REACT_APP_KUDOS_BASE_URL
    const res = await fetch(base_url + '/admin/update-user-role', requestOptions)
    if(res.status === 200){
      Swal.fire({
        title: 'Success!',
        text: 'User role has been changed.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#167bff'
      }) 
      
    }else{
      Swal.fire({
        title: 'Failed!',
        text: 'Changing the role of the user has failed.',
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

    var auth="ROLE_ADMIN"
    if(document.getElementById('admin').checked) {
      auth = document.getElementById("admin").value;
    }else if(document.getElementById('user').checked) {
      auth = document.getElementById("user").value;
    }
    changeRole(uname, auth)
    
  };

    return (
      <div className='container-all '>
          <h3 className='add-user-title'>Change User Role</h3>
          <hr className='hr-add-user'></hr>
        <form onSubmit={handleSubmit}>
            <label htmlFor='users' className='' style={{alignContent:'left'}}>Username</label>
            <br></br>
            <input
            type="text"
            className="form-control"
            placeholder=""
            name = "sname"
            autoComplete = "on"
            id='userName'
            required
          />
            <h6 className='change-role-h3'>Authority</h6>
           
        <div className='center-radio-btn'>
          <input type="radio" id="admin" name="ROLE" value="ROLE_ADMIN"  defaultChecked="true" className='radio-btn'/>
            <label htmlFor="admin">Admin</label>
          <input type="radio" id="user" name="ROLE" value="ROLE_USER" className='radio-btn'/>
            <label htmlFor="user">User</label><br></br>
</div>
            <button type='submit' className='btn btn-outline-primary btn-change-role'>Change User Role</button>
        </form>

      </div>    
      
    );
  };


export default ChangeUserRole;
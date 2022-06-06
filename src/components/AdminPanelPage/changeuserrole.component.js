import React from 'react'
import "../../styles.css";
import {  getCookie } from '../cookie-functions';
import Swal from 'sweetalert2';


const ChangeUserRole = () => {

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
      <div className='container-all d-change-role'>
          <h3 className='add-user-title'>Change User Role</h3>
          <hr className='hr-add-user'></hr>
        <form onSubmit={handleSubmit}>
            <label htmlFor='users' className='lbl-change-role'>Change role of:</label>
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
            <h6 className='change-role-h3'>to</h6>
            {/* <input
            type="text"
            className="form-control"
            placeholder=""
            name = "sname"
            autoComplete = "on"
            required
          /> */} 
            <input type="radio" id="admin" name="ROLE" value="ROLE_ADMIN"  defaultChecked="true"/>
            <label htmlFor="admin">Admin</label>
            <input type="radio" id="user" name="ROLE" value="ROLE_USER" />
            <label htmlFor="user">User</label><br></br>
            <button type='submit' className='btn btn-outline-primary btn-change-role'>Change Role</button>
        </form>

      </div>    
      
    );
  };


export default ChangeUserRole;
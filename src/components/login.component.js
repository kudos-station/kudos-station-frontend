import React, { useState } from 'react'
import "../styles.css";
import { getCookie, setCookie } from './cookie-functions';
import { useNavigate } from "react-router-dom";

const Login = () => {
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
    }else{
      setCookie('kudos-auth', encoded, 1)
      console.log(getCookie('kudos-auth'))
      console.log(res)
      navigate("/home");

      //this.props.history.push('/mainpage.component')
      //return <Redirect to='/mainpage.component'  />

    }
  }

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    const combined = uname.value + ':' + pass.value;
    const encoded = 'Basic ' + window.btoa(combined)
    fetchUser(encoded)
  };

  const renderErrorMessage = (name) =>
  name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

    return (
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>
        <div className="mb-3">
          <label>User Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            name = "uname"
            required
          />
          {renderErrorMessage("uname")}
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name = "pass"
            autoComplete = "on"
            required
          />
          {renderErrorMessage("pass")}
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          <a href="/forgot-password">Forgot password?</a>
        </p>
      </form>
    );
  };


export default Login;
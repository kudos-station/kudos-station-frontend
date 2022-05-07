import React, { useState } from 'react'
import "../styles.css";
const Login = ({ fetchedUsers }) => {
  const [errorMessages, setErrorMessages] = useState({});

  const errors = {
    email: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { email, pass } = document.forms[0];

    // Find user login info
    const userData = fetchedUsers.find((user) => user.email === email.value);

    // Compare user info
    if (userData) {
        //setIsSubmitted(true);
    } else {
      // Username not found
      setErrorMessages({ name: "email", message: errors.email });
    }
  };

  const renderErrorMessage = (email) =>
  email === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

    return (
      <form onSubmit={handleSubmit}>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name = "email"
            required
          />
          {renderErrorMessage("email")}
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name = "pass"
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
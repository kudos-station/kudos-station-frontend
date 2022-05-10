import React, { useState } from "react";

const ForgotPassword = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)

    const onClick = (e) => {
        e.preventDefault()
        setIsSubmitted(true);
        
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );  
        }
    const defaultView = (
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            required
          />
        </div>
    )
    const showCode = (
        <div className="mb-3">
          <label>Code</label>
          <input
            type="text"
            className="form-control"
            placeholder="12345 etc..."
            required
          />
        </div>
    )
    return (
      <form onSubmit = {onClick}>
        <h3>Forgot Password</h3>
        {isSubmitted ? showCode : defaultView}
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    );
  };


export default ForgotPassword;
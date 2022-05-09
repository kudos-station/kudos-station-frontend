import React, { useState } from "react";
import Login from "./login.component";
const ForgotPassword = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)

    function delete_cookie(name) {
      document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    function getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    const onClick = (e) => {
        e.preventDefault()
        setIsSubmitted(true);
        console.log(getCookie('kudos-auth'))
        console.log('deleting cookie')
        //delete_cookie('kudos-auth')
        console.log(getCookie('kudos-auth'))
        
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
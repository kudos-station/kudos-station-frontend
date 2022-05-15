import React from "react";
import { getCookie } from '../cookie-functions'

const CreateNewKudos = () => {

    const sendKudos = async (sender, recipient, comment) => {
        const requestOptions = {
          method: 'POST',
          headers: {'Authorization': getCookie('kudos-auth'), 'Content-type': 'application/json'},
          body: JSON.stringify({"content": comment})
        };
        const base_url = process.env.REACT_APP_KUDOS_BASE_URL
        const res = await fetch(base_url + '/user/send-kudos/' + sender + '/' + recipient, requestOptions)
        if(res.status === 200){
          console.log('send kudos successful')          
        }else{
          console.log('failed to send')
        }
      }
    const getSender = () => {
      const encoded = getCookie('kudos-auth').substring(6)
      var decoded = window.atob(encoded)
      decoded = decoded.split(":")[0]
      console.log(decoded)
      return decoded
    }

    const onClick = (e) => {
        e.preventDefault()
        const sender = getSender()
        var { recipient, comment } = document.forms[1];
        console.log(recipient.value)
        console.log(comment.value)
        console.log(JSON.stringify(comment.value))
        if(sender === recipient.value) return
        sendKudos(sender, recipient.value, comment.value)
        }
    
    return (
      <form onSubmit = {onClick}>
        <div className="main-page-component" id="cnk">
        <h3>Create New Kudos</h3>
          <div className="mb-3">
            <label>Send Kudos To:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              name = "recipient"
              required
            />
          </div>
          <div className="mb-3" >
            <label>Comment:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter comment"
              name = "comment"
              required
            />
          </div>
          <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Send Kudos
          </button>
        </div>
        </div>
      </form>
    );
  };


export default CreateNewKudos;
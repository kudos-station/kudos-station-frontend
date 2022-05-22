import React from "react";
import { useState, useEffect } from 'react'
import { getCookie } from '../cookie-functions'
import { Dropdown, DropdownButton } from "react-bootstrap";


const CreateNewKudos = () => {
  
  const [kudosVar, setKudosVar] = useState([])
  const [selectedKudos, setSelectedKudos] = useState("")
  const [selectedKudosProject, setSelectedKudosProject] = useState("")
  const [selectedKudosDep, setSelectedKudosDep] = useState("")

  useEffect(() => {
    getKudosVar()

}, [window.location.pathname]);

  const getUsersInProject = async (projectName) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Authorization': getCookie('kudos-auth'), 'Content-Type': 'application/json'},
      body: JSON.stringify({"projectName": projectName})
    };
    const base_url = process.env.REACT_APP_KUDOS_BASE_URL
    const res = await fetch(base_url + '/user/projects-by-name', requestOptions)
    const data = await res.json()
    if(res.status === 200){
      console.log(data["usernames"])
      return data["usernames"]
    }else{
      console.log("failed")
      return
    }
  }

  const getUsersInDep = async (depName) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Authorization': getCookie('kudos-auth'), 'Content-Type': 'application/json'},
      body: JSON.stringify({"departmentName": depName})
    };
    const base_url = process.env.REACT_APP_KUDOS_BASE_URL
    const res = await fetch(base_url + '/user/departments-by-name', requestOptions)
    const data = await res.json()
    if(res.status === 200){
      console.log(data["usernames"])
      return data["usernames"]
    }else{
      console.log("failed")
      return
    }
  }

  const getKudosVar = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {'Authorization': getCookie('kudos-auth')},
    };
    const base_url = process.env.REACT_APP_KUDOS_BASE_URL
    const res = await fetch(base_url + '/user/kudos-variations', requestOptions)
    const data = await res.json()
    if(res.status === 200){
      setKudosVar(data["kudosVariations"])
    }else{
      console.log("failed")
    }
  }
    const sendKudos = async (sender, recipient, kudosVariation) => {
        const requestOptions = {
          method: 'POST',
          headers: {'Authorization': getCookie('kudos-auth')}
        };
        console.log(kudosVariation)
        const base_url = process.env.REACT_APP_KUDOS_BASE_URL
        const res = await fetch(base_url + '/user/send-kudos/' + sender + '/' + recipient + '/' + kudosVariation, requestOptions)
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
      return decoded
    }

    const onClick = (e) => {
        e.preventDefault()
        const sender = getSender()
        var { recipient } = document.forms[1];
        if(sender === recipient.value) return
        sendKudos(sender, recipient.value, selectedKudos)
        
        }

    const onClickProj = async (e) => {
      e.preventDefault()
      const sender = getSender()
      var { projectName } = document.forms[2];
      if(sender === projectName.value) return
      const usersInPj = await getUsersInProject(projectName.value)
      console.log(usersInPj[0])
      for(let i = 0; i<usersInPj.length; i++){
        sendKudos(sender, usersInPj[i], selectedKudosProject)
      }          
    }

    const onClickDep = async (e) => {
      e.preventDefault()
      const sender = getSender()
      var { depName } = document.forms[3];
      if(sender === depName.value) return
      const usersInDep = await getUsersInDep(depName.value)
      console.log(usersInDep)
      for(let i = 0; i<usersInDep.length; i++){
        sendKudos(sender, usersInDep[i], selectedKudosDep)
      }          
    }
        
      const changeSelectedKudos = (val) => {
      if(kudosVar.includes(val.target.id)){
      setSelectedKudos(val.target.id)
      }
    }
    const changeSelectedKudosProject = (val) => {
    if(kudosVar.includes(val.target.id)){
      setSelectedKudosProject(val.target.id)
    }
    }
    const changeSelectedKudosDep = (val) => {
      if(kudosVar.includes(val.target.id)){
      setSelectedKudosDep(val.target.id)
      }
    }

    const correctFormat = (variation) => {
      switch(variation) {
        case "fast":
          return "Fast"
          break;
        case "team-player":
          return "Team Player"
          break;
        case "respectful":
          return "Respectful"
          break;
        default:
          return "Not Selected"
          return
      }
    }

    return (
      <div>
      <h3>Send Kudos</h3>
      <div className= "cnk-page">
      <form onSubmit = {onClick}>
        <div className="main-page-component" id="cnk">
          <div className="mb-3">
          <h4>To Individual:</h4>
            <label>Username:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              name = "recipient"
              required
            />
          </div>
          <div>
            <label style = {{"paddingBottom": "10px"}}>Kudos Type:</label>
            <DropdownButton id="dropdown-basic-button" title="Select Kudos Type" onClick = {changeSelectedKudos}>
              <Dropdown.Item id={kudosVar[0]} >Fast</Dropdown.Item>
              <Dropdown.Item id={kudosVar[1]} >Team Player</Dropdown.Item>
              <Dropdown.Item id={kudosVar[2]}>Respectful</Dropdown.Item>
            </DropdownButton>
          </div>
          <div style = {{ color: "green" }}>{"Current Selection: " + correctFormat(selectedKudos)}</div>
          <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Send Kudos
          </button>
        </div>
        </div>
      </form>
      
      <form onSubmit = {onClickProj}>
        <div className="main-page-component" id="cnk">
          <div className="mb-3">
          <h4>To Project:</h4>
            <label>Project Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter project"
              name = "projectName"
              required
            />
          </div>
          <div>
            <label style = {{"paddingBottom": "10px"}}>Kudos Type:</label>
            <DropdownButton id="dropdown-basic-button" title="Select Kudos Type" onClick = {changeSelectedKudosProject}>
              <Dropdown.Item id={kudosVar[0]} >Fast</Dropdown.Item>
              <Dropdown.Item id={kudosVar[1]} >Team Player</Dropdown.Item>
              <Dropdown.Item id={kudosVar[2]}>Respectful</Dropdown.Item>
            </DropdownButton>
          </div>
          <div style = {{ color: "green" }}>{"Current Selection: " + correctFormat(selectedKudosProject)}</div>
          <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Send Kudos
          </button>
        </div>
        </div>
      </form>

      <form onSubmit = {onClickDep}>
        <div className="main-page-component" id="cnk">
          <div className="mb-3">
          <h4>To Department:</h4>
            <label>Department Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter department"
              name = "depName"
              required
            />
          </div>
          <div>
            <label style = {{"paddingBottom": "10px"}}>Kudos Type:</label>
            <DropdownButton id="dropdown-basic-button" title="Select Kudos Type" onClick = {changeSelectedKudosDep}>
              <Dropdown.Item id={kudosVar[0]} >Fast</Dropdown.Item>
              <Dropdown.Item id={kudosVar[1]} >Team Player</Dropdown.Item>
              <Dropdown.Item id={kudosVar[2]}>Respectful</Dropdown.Item>
            </DropdownButton>
          </div>
          <div style = {{ color: "green" }}>{"Current Selection: " + correctFormat(selectedKudosDep)}</div>
          <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Send Kudos
          </button>
        </div>
        </div>
      </form>
    </div>
    </div>
    );
  };


export default CreateNewKudos;
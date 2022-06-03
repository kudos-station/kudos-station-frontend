import React from "react";
import { getCookie } from '../cookie-functions';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'


const Filter = () => {

  const [inputDepartment, setInputDepartment] = useState([{}])
  const navigate = useNavigate();
  useEffect(() => {
    if (!getCookie('kudos-auth')) {
      navigate("/login");
    }
  }, [])

 const onClick1 = async(e) => {
    e.preventDefault();
    var { department } = document.forms[1];
    sendDepartment(department.value)
  
  }
  const onClick2 = async(e) => {
    e.preventDefault();
    var { department2 } = document.forms[2];
    sendDepartment2(department2.value)
  }
  const onClick3 = async (e) => {
    e.preventDefault();
    var { kudosType } = document.forms[3];
    sendProjectsOfUser(kudosType.value)  
  }
  const onClick4 = async (e) => {
    e.preventDefault();
    var { projectName } = document.forms[4];
    sendUserByProject(projectName.value)
  }

  const sendDepartment2 = async (department2) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Authorization': getCookie('kudos-auth'), 'Content-Type': 'application/json' },
      body: JSON.stringify({ "departmentName": department2 })
    };
    const base_url = process.env.REACT_APP_KUDOS_BASE_URL
    const res = await fetch(base_url + '/user/kudos/received-all-variations/from-department/', requestOptions)
    const data = await res.json()
    if (res.status === 200) {
      console.log('send department successful')
      console.log(data["usernames"])
      console.log("geldi mi" + JSON.stringify(data["usernames"]))
      navigate('/usersByDepartment', {
        state: {
          datam: data
        }
      });
    } else {
      console.log('failed to send')
    }
  }
  const sendProjectsOfUser = async (kudosType) => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': getCookie('kudos-auth'), 'Content-Type': 'application/json' },
    };
    const base_url = process.env.REACT_APP_KUDOS_BASE_URL
    const res = await fetch(base_url + '/user/kudos/most-given-kudos-variation/' + kudosType  , requestOptions)
    const data = await res.json()
    if (res.status === 200) {
      navigate('/usersProjectWithMaxKudos', {
        state: {
          datam: data
        }
      });
    } else {
      console.log('failed to send')
    }
  }
  const sendUserByProject = async (projectName) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Authorization': getCookie('kudos-auth'), 'Content-Type': 'application/json' },
      body: JSON.stringify({ "projectName": projectName })
    };
    const base_url = process.env.REACT_APP_KUDOS_BASE_URL
    const res = await fetch(base_url + '/user/project/obtained-all-kudos-variation/sent-any-kudos/', requestOptions)
    const data = await res.json()
    if (res.status === 200) {
      navigate('/usersByProject', {
        state: {
          datam: data
        }
      });
    } else {
      console.log('failed to send')
    }
  }

  const sendDepartment = async (department) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Authorization': getCookie('kudos-auth'), 'Content-Type': 'application/json' },
      body: JSON.stringify({ "departmentName": department })
    };
    const base_url = process.env.REACT_APP_KUDOS_BASE_URL
    const res = await fetch(base_url + '/user/kudos/works-in-all-projects/from-department/', requestOptions)
    const data = await res.json()
    if (res.status === 200) {
      console.log('send department successful')
      setInputDepartment(JSON.stringify(data));
      navigate('/kudosByDepartment', {
        state: {
          datam: JSON.stringify(data)
        }
      });
    } else {
      console.log('failed to send')
    }
  }



    return (
      <div>
        <div className = "flex1">
            <form  onSubmit = {onClick1} name="form1">
              <div className="filterComponent1" id="cnk">
                <h3>Filter Kudos By Department</h3>
                <p>Shows the last 5 recent kudoses that are owned by users who work in all projects run by the given department.</p>
                  <div className="mb-3">
                    <label>Department</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Department"
                      name = "department"
                      required
                    />
                  </div>
                  <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Filter
                  </button>
                </div>
              </div>
            </form>
          
            <form name="form2"  onSubmit = {onClick2}>
              <div className="filterComponent2" id="cnk">
                <h3>Filter Users by Department</h3>
                  <p>Shows the users who works in the given department and get all variation of the kudoses.</p>
                  <div className="mb-3">
                    <label>Department</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Department"
                      name = "department2"
                      required
                    />
                  </div>
                  <div className="d-grid">
                  <button type="submit"   className="btn btn-primary">
                    Filter
                  </button>
                </div>
              </div>
            </form>

          </div>
          
          <br></br>
          
          <div className = "flex1">
              <form name="form3" onSubmit = {onClick3}>
                <div className="filterComponent3" id="cnk">
                  <h3>Filter User's Projects by # of Kudos</h3>
                  <p>Prints the person who gets the most kudos given kudos type and the projects this person is currently working on.</p>
                    <div className="mb-3">
                      <label>Kudos Type</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Kudos Type"
                         name= "kudosType"
                        required
                      />
                    </div>
                    <div className="d-grid">
                    <button type="submit"  className="btn btn-primary">
                      Filter
                    </button>
                  </div>
                </div>
            </form>

            <form name="form4" onSubmit = {onClick4}>
                <div className="filterComponent4" id="cnk">
                  <h3>Filter Users by Project</h3>
                  <p>Prints users who work on the given project and are recieved all of the kudos types and sent any of the kudos type.</p>
                    <div className="mb-3">
                      <label>Project</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Project"
                  name= "projectName"
                        required
                      />
                    </div>
                    <div className="d-grid">
                    <button type="submit"   className="btn btn-primary">
                      Filter
                    </button>
                  </div>
                </div>
              </form>
        </div>
      

      </div>
    );
  };


export default Filter;

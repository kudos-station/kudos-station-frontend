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

  const onClick1 = async (e) => {
    e.preventDefault();
    var { department } = document.forms[1];
    sendDepartment(department.value)

  }
  const onClick2 = async (e) => {
    e.preventDefault();
    var { department2 } = document.forms[2];
    sendDepartment2(department2.value)
  }
  const onClick3 = async (e) => {
    e.preventDefault();
    var { kudosType } = document.forms[4];
    sendProjectsOfUser(kudosType.value)
  }
  const onClick4 = async (e) => {
    e.preventDefault();
    var { pName } = document.forms[5];
    sendUserByProject(pName.value)
  }
  const onClick5 = async (e) => {
    e.preventDefault();
    var { userKudosType } = document.forms[3];
    sendUsersByKudosType(userKudosType.value)
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
      
      navigate('/usersByDepartment', {
        state: {
          datam: data,
          dName: department2
        }
      });
    }
  }
  const sendUsersByKudosType = async (userKudosType) => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': getCookie('kudos-auth'), 'Content-Type': 'application/json' },
    };
    const base_url = process.env.REACT_APP_KUDOS_BASE_URL
    const res = await fetch(base_url + '/user/kudos/kudos-variation/' + userKudosType + '/given-range', requestOptions)
    const data = await res.json()
    if (res.status === 200) {
      navigate('/usersByKudos', {
        state: {
          datam: data,
          kType: userKudosType
        }
      });
    }
  }
  const sendUserByProject = async (pName) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Authorization': getCookie('kudos-auth'), 'Content-Type': 'application/json' },
      body: JSON.stringify({ "projectName": pName })
    };
    const base_url = process.env.REACT_APP_KUDOS_BASE_URL
    const res = await fetch(base_url + '/user/project/obtained-all-kudos-variation/sent-any-kudos/', requestOptions)
    const data = await res.json()
    if (res.status === 200) {
      navigate('/usersByProject', {
        state: {
          usernamesData: JSON.stringify(data["usernames"]),
          firstNames: JSON.stringify(data["firstNames"]),
          lastNames: JSON.stringify(data["lastNames"]),
          projectName: pName
        }
      });
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
      
      setInputDepartment(JSON.stringify(data));
      navigate('/kudosByDepartment', {
        state: {
          datam: JSON.stringify(data),
          dName: department
        }
      });
    }
  }
  const sendProjectsOfUser = async (kudosType) => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': getCookie('kudos-auth'), 'Content-Type': 'application/json' },
    };
    const base_url = process.env.REACT_APP_KUDOS_BASE_URL
    const res = await fetch(base_url + '/user/kudos/most-given-kudos-variation/' + kudosType, requestOptions)
    const data = await res.json()
    if (res.status === 200) {
      navigate('/usersProjectWithMaxKudos', {
        state: {
          datam: data
        }
      });
    } 
  }



  return (
    <div>
      <div className="flex1">
        <form onSubmit={onClick1} name="form1">
          <div className="filterComponent1" id="cnk">
            <h3>Filter Kudos By Department</h3>
            <p>Shows the last 3 recent kudoses that are owned by users who work in all projects run by the given department.</p>
            <div className="mb-3">
              <label>Department</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Department"
                name="department"
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

        <form name="form2" onSubmit={onClick2}>
          <div className="filterComponent2" id="cnk">
            <h3>Filter Users by Department</h3>
            <p>Shows the users who works in the given department and get all variation of the kudoses.</p>
            <div className="mb-3">
              <label>Department</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Department"
                name="department2"
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



        <form name="form5" onSubmit={onClick5}>
          <div className="filterComponent3" id="cnk">
            <h3>Filter Users by Kudos Type</h3>
            <p>Shows users who has sent at least 2 given kudoses, but has not sent more than 10.</p>
            <div className="mb-3">
              <label>Kudos Type</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Kudos Type"
                name="userKudosType"
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

      </div>

      <br></br>

      <div className="flex1" style = {{"margin": "auto", "width": "73.5%"}}>
        <form name="form3" onSubmit={onClick3}>
          <div className="filterComponent4" id="cnk">
            <h3>Filter User's Projects by # of Kudos</h3>
            <p>Shows the person who gets the most kudos given kudos type and the projects this person is currently working on.</p>
            <div className="mb-3">
              <label>Kudos Type</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Kudos Type"
                name="kudosType"
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

        <form name="form4" onSubmit={onClick4}>
          <div className="filterComponent5" id="cnk">
            <h3>Filter Users <br></br> by Project</h3>
            <p>Shows users who work on the given project and are recieved all of the kudos types and sent any of the kudos type.</p>
            <div className="mb-3">
              <label>Project</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Project"
                name="pName"
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

      </div>


    </div>
  );
};


export default Filter;

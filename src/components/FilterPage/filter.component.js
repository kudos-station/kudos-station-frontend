import React from "react";
import { getCookie } from '../cookie-functions';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'

const Filter = () => {
    
  const navigate = useNavigate();
  useEffect(() => {
      if(!getCookie('kudos-auth')){    
          navigate("/login");
      }
  },[])

  const onClick1 = (e) => {
    e.preventDefault();
    console.log("Im inside onclick 1");
  }

  const onClick2 = (e) => {
    e.preventDefault();
    console.log("Im inside onclick 2");
  }

  const onClick3 = (e) => {
    e.preventDefault();
    console.log("Im inside onclick 3");
  }

  const onClick4 = (e) => {
    e.preventDefault();
    console.log("Im inside onclick 4");
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
              <p>Shows the users who works in the given department and get all variation of the kudoses</p>
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
                    name = "recipient"
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
                    name = "recipient"
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

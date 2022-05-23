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
            <p>Shows the last 5 recent KUDOSes that are owned by users who work in all projects which is run by the given department.</p>
              <div className="mb-3">
                <label>Department</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Department"
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
              <p>Shows the users who works in the given department and get all variation of the KUDOSes</p>
              <div className="mb-3">
                <label>Department</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Department"
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
            <div className="filterComponent1" id="cnk">
              <h3>Filter Projects</h3>
              <p>Description</p>
                <div className="mb-3">
                  <label>Filters</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Filters"
                    name = "recipient"
                    required
                  />
                </div>
                <div className="mb-3" >
                  <label>Filters</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Filters"
                    name = "comment"
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
            <div className="filterComponent2" id="cnk">
              <h3>Filter Users</h3>
              <p>Description</p>
                <div className="mb-3">
                  <label>Filters</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Filters"
                    name = "recipient"
                    required
                  />
                </div>
                <div className="mb-3" >
                  <label>Filters</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Filters"
                    name = "comment"
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

import React from "react";
import { getCookie } from '../cookie-functions'
import { useNavigate } from "react-router-dom";
const Filter = () => {
    
  const onClick = (e) => {
  
  }



    return (
<div className>

  <form onSubmit = {onClick}>
    <div className = "flex1">
      <div className="filterComponent1" id="cnk">
        <h3>Filter Kudos</h3>
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
          <button type="submit" className="btn btn-primary">
            Filter
          </button>
        </div>
      </div>
      <div className="filterComponent2" id="cnk">
        <h3>Filter by Department</h3>
          <p>Description</p>
          <div className="mb-3">
            <label>Department 1</label>
            <input
              type="text"
              className="form-control"
              placeholder="in Department"
              name = "recipient"
              required
            />
          </div>
          <div className="mb-3" >
            <label>Department 2</label>
            <input
              type="text"
              className="form-control"
              placeholder="not in Department"
              name = "comment"
              required
            />
          </div>
          <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Filter
          </button>
        </div>
      </div>
    </div>
    <br></br>
    <div className = "flex1">
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
          <button type="submit" className="btn btn-primary">
            Filter
          </button>
        </div>
      </div>
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
          <button type="submit" className="btn btn-primary">
            Filter
          </button>
        </div>
      </div>
    </div>


 </form>
  

 </div>
    );
  };


export default Filter;

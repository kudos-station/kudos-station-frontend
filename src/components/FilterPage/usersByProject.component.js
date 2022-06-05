import { useNavigate } from "react-router-dom";
import { getCookie } from "../cookie-functions";
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from "react";



function UsersByProject() {

    const navigate = useNavigate();

    
    useEffect(() => {
        if (!getCookie('kudos-auth')) {
            navigate("/login");
        }
    }, [])
    const location = useLocation();
    var currentUsers = JSON.parse(location.state.usernamesData)
    var currentFirstNames = JSON.parse(location.state.firstNames)
    var currentLastNames = JSON.parse(location.state.lastNames)

    
   
    return (
        <>

            <div className="usersByDepartmentComponent">
                <div id="users" >
                    <h1 className="text-center"> {location.state.projectName} </h1>
                    <p> These users are working on the input project and are recieved all of the kudos types and sent at least one kudos type.</p>
                    <div id="horizontalLine"  ></div> 
                        {currentUsers.map(currentUsers => <p> {currentUsers}</p>)} 
                        {currentFirstNames.map(currentFirstNames => <p> {currentFirstNames}</p>)} 
                        {currentLastNames.map(currentLastNames => <p> {currentLastNames}</p>)} 
                </div>

            </div>

        </>

    );
}


export default UsersByProject;


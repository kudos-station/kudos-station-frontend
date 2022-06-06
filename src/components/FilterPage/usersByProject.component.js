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

            <div className="main-page-component">
                <div className="container" >
                    <h3 className="p-3 text-center"></h3>
                    <h1 className="text-center"> {location.state.projectName} </h1>
                    <p> These users are working on the selected project and they are recieved all of the kudos types and sent at least one kudos type.</p>
                    <table className="table table-striped table-bordered" style={{ "marginTop": "15px" }}>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers && currentUsers.map((kudo, index) =>
                                <tr key={index}>
                                    <td>{currentUsers[index]}</td>
                                    <td>{currentFirstNames[index]}</td>
                                    <td>{currentLastNames[index]}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>

        </>

    );
}


export default UsersByProject;


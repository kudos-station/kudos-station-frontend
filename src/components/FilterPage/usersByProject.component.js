import React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react'
import { getCookie } from "../cookie-functions";
import { useLocation } from 'react-router-dom';




function UsersByProject() {

    const navigate = useNavigate();
    useEffect(() => {
        if (!getCookie('kudos-auth')) {
            navigate("/login");
        }
    }, [])
    const location = useLocation();
    let users = []
    users.push(location.state.datam["username"])


   
    return (
        <>

            <div className="usersByDepartmentComponent">
                <div id="users" >
                    <h1 className="text-center"> Filtered Users </h1>
                    <p> These users are working on the input project and are recieved all of the kudos types and sent at least one kudos type.</p>
                    <div id="horizontalLine"  ></div> 
                {users.map(users => <p>{users}</p>)}
                </div>

            </div>

        </>

    );
}


export default UsersByProject;


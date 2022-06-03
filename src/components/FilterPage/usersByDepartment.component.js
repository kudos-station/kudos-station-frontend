import React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react'
import { getCookie } from "../cookie-functions";
import { useLocation } from 'react-router-dom';



function UsersByDepartment() {


    const navigate = useNavigate();
    useEffect(() => {
        if (!getCookie('kudos-auth')) {
            navigate("/login");
        }
    }, [])

    const location = useLocation();
    const users = location.state.datam["usernames"]
    return (
        <>
            <div className="usersByDepartmentComponent">
                <div id="users" >
                    <h1 className="text-center"> Filtered Users </h1>
                    <p> These users are working on kudos station developlement department, also they recieved all variations of possible kudoses </p>
                    <div id="horizontalLine"  ></div>
                    {users.map(users => <p>{users}</p>)}
                    <br></br>
                </div>

            </div>
            
     
        </>

    );
}


export default UsersByDepartment;


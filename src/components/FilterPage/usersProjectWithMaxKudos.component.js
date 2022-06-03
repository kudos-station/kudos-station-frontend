import React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react'
import { getCookie } from "../cookie-functions";
import { useLocation } from 'react-router-dom';


function UsersProjectWithMaxKudos() {

    const location = useLocation();
    let projects = []
    projects.push(location.state.datam["project"])
    const user = location.state.datam["username"]
    const username = user.charAt(0).toUpperCase() + user.slice(1);

    const navigate = useNavigate();
    useEffect(() => {
        if (!getCookie('kudos-auth')) {
            navigate("/login");
        }
    }, [])

    return (
        <>
            <div className= "containerUsersComponent" >
                    <div id="containerUsers" >
                    <h1 className="text-center">{username}</h1>
                    {username} has the most input kudos type. 
                    <br></br>
                    Here are the {username}'s current projects.
                    <br></br>
                        <div id="horizontalLine"  ></div>
                    {projects.map(projects => <p>{projects}</p>)}
                    </div>
                </div>

        </>

    );
}

export default UsersProjectWithMaxKudos;
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
        console.log(projects)
        if (!getCookie('kudos-auth')) {
            navigate("/login");
        }
    }, [])

    return (
        <>
            <div className= "containerUsersComponent" >
                    <div id="containerUsers" >
                    <h4 className="text-center"> {username} has the most selected kudos type. </h4>

                        <div id="horizontalLine"  ></div>
                        <table className="table table-striped table-bordered" style= {{"marginTop":"15px"}}>
                        <thead>
                            <tr>
                                <th>{username}'s Active Projects</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects[0] && projects[0].map((project, index) =>
                                <tr key={index}>
                                    <td>{project}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    </div>
                </div>

        </>

    );
}

export default UsersProjectWithMaxKudos;
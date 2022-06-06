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
    const departmentName = location.state.dName;
    return (
        <>
            <div className="usersByDepartmentComponent">
                <div id="users" >
                    <h1 className="text-center">{departmentName} </h1>
                    <p> These users are working on {departmentName} department, and they recieved all possible variations of kudoses. </p>
                    <div id="horizontalLine"  ></div>
                    <table className="table table-striped table-bordered" style= {{"marginTop":"15px"}}>
                        <thead>
                            <tr>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.map((user, index) =>
                                <tr key={index}>
                                    <td>{user}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <br></br>
                </div>

            </div>
            
     
        </>

    );
}


export default UsersByDepartment;


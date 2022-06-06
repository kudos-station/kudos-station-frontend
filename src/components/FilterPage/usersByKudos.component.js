import React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react'
import { getCookie } from "../cookie-functions";
import { useLocation } from 'react-router-dom';



function UsersByKudos() {


    const navigate = useNavigate();
    useEffect(() => {
        if (!getCookie('kudos-auth')) {
            navigate("/login");
        }
    }, [])

    const location = useLocation();
    const users = location.state.datam["usernames"]
    const kt = location.state.kType;
    const kudosType = kt.charAt(0).toUpperCase() + kt.slice(1);

    return (
        <>
            <div className="usersByDepartmentComponent">
                <div id="users" >
                    <h1 className="text-center">{kudosType} </h1>
                    <p> Who has sent at least 5 {kudosType} kudoses, but has not sent more than 10 </p>
                    <div id="horizontalLine"  ></div>
                    {users.map(users => <p>{users}</p>)}
                    <br></br>
                </div>

            </div>


        </>

    );
}


export default UsersByKudos;


import React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import { getCookie } from "../cookie-functions";



function UsersByDepartment() {

    const navigate = useNavigate();
    useEffect(() => {
        if (!getCookie('kudos-auth')) {
            navigate("/login");
        }
    }, [])

    const [usernames, getUsernames] = useState("")


    const getUser = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': getCookie('kudos-auth') },
        };
        const base_url = process.env.REACT_APP_KUDOS_BASE_URL
        const res = await fetch(base_url + '/user/kudos/recieved-all-variations/from-department', requestOptions)
        const data = await res.json()


        if (res.status === 200) {
            getUsernames(data["usernames"])

        } else {
            console.log("failed")
        }

    }
    getUser()
    return (
        <>
            <div className="usersByDepartmentComponent">
                <div id="users" >
                    <h1 className="text-center"> Filtered Users </h1>
                    <p> These users are working on kudos station developlement department, also they recieved all variations of possible kudoses </p>
                    <div id="horizontalLine"  ></div>
                    {usernames} <br></br>
                    user2<br></br>
                    user3<br></br>
                    user4<br></br>
                    user5<br></br>
                </div>

            </div>
            
     
        </>

    );
}


export default UsersByDepartment;


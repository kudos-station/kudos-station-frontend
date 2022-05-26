import React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import { getCookie } from "../cookie-functions";



function UsersByProject() {


    return (
        <>

            <div className="usersByDepartmentComponent">
                <div id="users" >
                    <h1 className="text-center"> Filtered Users </h1>
                    <p> These users are working on the input project and are recieved all of the kudos types and sent at least one kudos type.</p>
                    <div id="horizontalLine"  ></div>
                    user2<br></br>
                    user3<br></br>
                    user4<br></br>
                    user5<br></br>
                </div>

            </div>

        </>

    );
}


export default UsersByProject;


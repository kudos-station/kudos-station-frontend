import React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import { getCookie } from "../cookie-functions";



function UsersProjectWithMaxKudos() {


    return (
        <>

            <div className= "containerUsersComponent" >
                    <div id="containerUsers" >
                    <h1 className="text-center">Irmak Erkol</h1>

                        Irmak Erkol has the most input kudos type. 
                    <br></br>
                        Here are Irmak's current projects.
                    <br></br>
                        <div id="horizontalLine"  ></div>
                        Project1 <br></br>
                        Project1 <br></br>
                        Project1 <br></br>
                        Project1 <br></br>
                    </div>
                </div>

        </>

    );
}


export default UsersProjectWithMaxKudos;


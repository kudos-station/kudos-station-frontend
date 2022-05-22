import React from 'react'
import { getCookie } from '../components/cookie-functions';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'


    function Profile() {
        const [dataKudos, setDataKudos] = useState([{}])

        const getSentKudos = async (username) => {
            const requestOptions = {
                method: 'GET',
                headers: { 'Authorization': getCookie('kudos-auth') },
            };
            const base_url = process.env.REACT_APP_KUDOS_BASE_URL
            const resKudos = await fetch(base_url + '/user/sent/' + {username} + '/' + '3', requestOptions)
            const dataKudos = await resKudos.json()
            const normalizedData = await normalizeDataDate(dataKudos)
            
            if (resKudos.status === 200) {
                console.log(dataKudos)
                setDataKudos(normalizedData)
            } else {
                console.log("failed")
            }
        }
        const getRecievedKudos = async (username) => {
            const requestOptions = {
                method: 'GET',
                headers: { 'Authorization': getCookie('kudos-auth') },
            };
            const base_url = process.env.REACT_APP_KUDOS_BASE_URL
            const resKudos = await fetch(base_url + '/user/recieved/' + { username } + '/' + '3', requestOptions)
            const dataKudos = await resKudos.json()
            const normalizedData = await normalizeDataDate(dataKudos)

            if (resKudos.status === 200) {
                console.log(dataKudos)
                setDataKudos(normalizedData)
            } else {
                console.log("failed")
            }
        }
        const normalizeDataDate = async (dataKudos) => {

            for (let i = 0; i < dataKudos.length; i++) {
                var currEntry = dataKudos[i]
                currEntry["createdAt"] = await normalizeDateTime(currEntry["createdAt"])
            }
            return dataKudos
        }


        const normalizeDateTime = async (iso) => {
            const date = new Date(iso);
            const year = date.getFullYear();
            var month = date.getMonth() + 1;
            var dt = date.getDate();
            var timeMinutes = date.getMinutes();
            var timeHour = date.getHours();
            var timeSecond = date.getSeconds();

            if (dt < 10) {
                dt = '0' + dt;
            }
            if (month < 10) {
                month = '0' + month;
            }
            if (timeHour < 10) {
                timeHour = '0' + timeHour;
            }
            if (timeSecond < 10) {
                timeSecond = '0' + timeSecond;
            }
            if (timeMinutes < 10) {
                timeMinutes = '0' + timeMinutes;
            }

            return (dt + '/' + month + '/' + year + ' ' + timeHour + ':' + timeMinutes + ':' + timeSecond)
        }
        
        const kudosRecievedTable = (<table className="table table-striped table-bordered" >
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Recipient</th>
                    <th>Sender</th>
                    <th>Message</th>
                </tr>
            </thead>
            <tbody>
                {dataKudos && dataKudos.map((kudo, index) =>
                    <tr key={index}>
                        <td>{kudo.createdAt}</td>
                        <td>{kudo.recipient}</td>
                        <td>{kudo.sender}</td>
                        <td>{kudo.content}</td>
                    </tr>
                )}
            </tbody>
        </table> )
        const navigate = useNavigate();

        useEffect(() => {
            getSentKudos()
            getRecievedKudos()
        }, [window.location.pathname]);
        const [currentUserName, setCurrentUserName] = useState("")
        const [currentUserSurname, setCurrentUserSurname] = useState("")
        const [currentUserActiveProject, setCurrentUserActiveProject] = useState("")
        const [currentUserDepartment, setCurrentUserDepartment] = useState("")
      
   
        
        useEffect(() => {
            if (!getCookie('kudos-auth')) {
                navigate("/login");
            }
        }, [])

        const getUser = async () => {
            const requestOptions = {
                method: 'GET',
                headers: { 'Authorization': getCookie('kudos-auth') },
            };
            const base_url = process.env.REACT_APP_KUDOS_BASE_URL
            const res = await fetch(base_url + '/user/profile/', requestOptions)
            const data = await res.json()
            

            if (res.status === 200) {
                setCurrentUserName(data["firstName"])
                setCurrentUserSurname(data["lastName"])
                setCurrentUserActiveProject(data["projects"])
                setCurrentUserDepartment(data["department"])

            } else {
                console.log("failed")
            }
          
        }
        getUser()
        return (
            <>
                <div id="container" >
                        <div id="line_1"  ></div>

                        <div class="flex-parent-top">
                            <div id = "image"> 
                                <img src="../ellipse_1.png" id="ellipse_1" />
                            </div>
                          
                            <div id="userInfo" >
                            <h2 >Name Surname</h2>Department<br />
                            </div>
                        </div>

                        <div id="line_2"  ></div>

                         <div class="flex-parent">
                            <div id="lhs" >
                            Active Project<br /><br /><br /> Kudos' Recieved<br /><br /><br /><br />Kudos' Sent
                            </div>

                            <div id="rhs" >
                            Kudos Project<br /><br />
                                 <div id= "table table-striped table-bordered" >
                                    {kudosRecievedTable}
                                </div> 
                                  <div id="table table-striped table-bordered" >
                                <br />
                                    {kudosRecievedTable}
                                </div> 
                            </div>
                         </div>
                    </div>
            </>
         
        );
    }
    

 export default Profile;


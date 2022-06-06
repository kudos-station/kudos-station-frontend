import React from 'react'
import { getCookie } from './cookie-functions';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

function SearchedProfile() {

    const navigate = useNavigate();
    useEffect(() => {
        if (!getCookie('kudos-auth')) {
            navigate("/login");
        }
    }, [])

    const location = useLocation();
    const user = location.state.datam["username"]

    const [dataKudos, setDataKudos] = useState([{}])
    const [dataSentKudos, setDataSendKudos] = useState([{}])

    const getSentKudos = async (user) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': getCookie('kudos-auth') },
        };
        const base_url = process.env.REACT_APP_KUDOS_BASE_URL
        const sentKudos = await fetch(base_url + '/user/kudos/sent/' + user + '/' + '1', requestOptions)
        const dataSentKudos = await sentKudos.json()
        const normalizedSentData = await normalizeDataDate(dataSentKudos)

        if (sentKudos.status === 200) {
            
            setDataSendKudos(normalizedSentData)
        }
    }
    const getRecievedKudos = async (user) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': getCookie('kudos-auth') },
        };
        const base_url = process.env.REACT_APP_KUDOS_BASE_URL
        const resKudos = await fetch(base_url + '/user/kudos/received/' + user + '/' + '1', requestOptions)
        const dataKudos = await resKudos.json()
        const normalizedData = await normalizeDataDate(dataKudos)

        if (resKudos.status === 200) {
         
            setDataKudos(normalizedData)
        }
    }
    const normalizeDataDate = async (dataKudos) => {

        for (let i = 0; i < dataKudos.length; i++) {
            var currEntry = dataKudos[i]
            currEntry["createdAt"] = await normalizeDateTime(currEntry["createdAt"])
        }
        return dataKudos
    }

    const correctFormat = (variation) => {
        switch (variation) {
            case "fast":
                return "Fast"
            case "team-player":
                return "Team Player"
            case "respectful":
                return "Respectful"
            default:
                return "Not Selected"
        }
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
                <th>Variation</th>
            </tr>
        </thead>
        <tbody>
            {dataKudos && dataKudos.map((kudo, index) =>
                <tr key={index}>
                    <td>{kudo.createdAt}</td>
                    <td>{kudo.recipientUsername}</td>
                    <td>{kudo.senderUsername}</td>
                    <td>{correctFormat(kudo.variation)}</td>
                </tr>
            )}
        </tbody>
    </table>)

    const kudosSendTable = (<table className="table table-striped table-bordered" >
        <thead>
            <tr>
                <th>Date</th>
                <th>Recipient</th>
                <th>Sender</th>
                <th>Variation</th>
            </tr>
        </thead>
        <tbody>
            {dataSentKudos && dataSentKudos.map((kudo, index) =>
                <tr key={index}>
                    <td>{kudo.createdAt}</td>
                    <td>{kudo.recipientUsername}</td>
                    <td>{kudo.senderUsername}</td>
                    <td>{correctFormat(kudo.variation)}</td>
                </tr>
            )}
        </tbody>
    </table>)


    useEffect(() => {
        getUser(user)
        getSentKudos(user)
        getRecievedKudos(user)
        getTotalKudos(user)
    }, [window.location.pathname]);

    const [currentUserName, setCurrentUserName] = useState("")
    const [currentUserSurname, setCurrentUserSurname] = useState("")
    const [currentUserActiveProject, setCurrentUserActiveProject] = useState("")
    const [currentUserDepartment, setCurrentUserDepartment] = useState("")
    const [currentSupervisor, setCurrentSupervisor] = useState(0)

    const getTotalKudos = async (username) => {
        const requestOptions = {
          method: 'GET',
          headers: {'Authorization': getCookie('kudos-auth')},
        };
        const base_url = process.env.REACT_APP_KUDOS_BASE_URL
        const res = await fetch(base_url + '/user/total-kudos/'+username, requestOptions)
        const data = await res.json()
        if(res.status === 200){
          
          setCurrentSupervisor(data["totalCount"])
        }
      }

    const getUser = async (user) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': getCookie('kudos-auth') },
        };
        const base_url = process.env.REACT_APP_KUDOS_BASE_URL
        const res = await fetch(base_url + '/user/profile/' + user, requestOptions)
        const data = await res.json()


        if (res.status === 200) {
            setCurrentUserName(data["firstName"])
            setCurrentUserSurname(data["lastName"])
            setCurrentUserActiveProject(data["projects"] + "")
            setCurrentUserDepartment(data["department"] + "")
        }

    }
    return (
        <>
            <div id="container" >
                <div id="line_1"  ></div>

                <div className="flex-parent-top">
                    <div id="image">
                        <img src="../ellipse_1.png" id="ellipse_1" alt=""/>
                    </div>

                    <div id="userInfo" >
                        <h2 >{currentUserName} {currentUserSurname}</h2>
                        <h6> {currentUserDepartment} </h6>
                        <br />
                    </div>
                </div>


                <div id="line_2"  ></div>

                <div className="flex-parent">
                    <div id="lhs" >
                        Active Project<br /><br /> Total Kudos <br /><br /><br /> <br />Kudos' Recieved<br /><br /><br /><br /><br /><br />Kudos' Sent<br /><br /><br />
                    </div>
                    <div id="rhs" >
                        {currentUserActiveProject}<br /><br />
                        {currentSupervisor} <br /> <br />
                        <div id="table table-striped table-bordered" >
                            {kudosRecievedTable}
                        </div>
                        <div id="table table-striped table-bordered" >
                            <br />
                            {kudosSendTable}
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}


export default SearchedProfile;


import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { getCookie } from '../cookie-functions';
import { useNavigate } from "react-router-dom";


const KudosByDepartment = () => {
    const location = useLocation();
    const [called, setCalled] = useState(0)
    const [kudos, setKudos] = useState([{}])
    const departmentName = location.state.dName;

    const navigate = useNavigate();
    useEffect(() => {
        if(!getCookie('kudos-auth')){    
            navigate("/login");
        }
    },[])

    const normalizeDataDate = async (data) => {
        for (let i = 0; i < data.length; i++) {
            var currEntry = data[i]
            currEntry["createdAt"] = await normalizeDateTime(currEntry["createdAt"])
        }
        return data
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

    const displayNormalDate = async () => {
        var currentKudos = JSON.parse(location.state.datam)
        currentKudos = await normalizeDataDate(currentKudos)
        setKudos(currentKudos)
    }
  
    if(called === 0){
        displayNormalDate()
        setCalled(1)
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
                return
        }
    }


    return (
        <div className="main-page-component">
            <div className="container">
                <h3 className="p-3 text-center"></h3>
                <h1 className="text-center"> {departmentName}</h1>
                <p>Shows the last 3 recent kudoses that are owned by users who work in all projects run by the {departmentName}.</p>
                <table className="table table-striped table-bordered" style={{ "marginTop": "15px" }}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Recipient</th>
                            <th>Sender</th>
                            <th>Kudos Variation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {kudos && kudos.map((kudo, index) =>
                            <tr key={index}>
                                <td>{kudo.createdAt}</td>
                                <td>{kudo.recipientUsername}</td>
                                <td>{kudo.senderUsername}</td>
                                <td>{correctFormat(kudo.variation)}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default KudosByDepartment;
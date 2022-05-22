import React, { useEffect, useState } from "react";
import { getCookie } from "../cookie-functions";

const RecentKudos = () => {

const [kudos, setKudos] = useState([{}])

  useEffect(() => {
      getRecentKudos()

}, [window.location.pathname]);

  const getRecentKudos = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {'Authorization': getCookie('kudos-auth')},
    };
    const base_url = process.env.REACT_APP_KUDOS_BASE_URL
    const res = await fetch(base_url + '/user/recent-kudos', requestOptions)
    const data = await res.json()
    const normalizedData = await normalizeDataDate(data)
    if(res.status === 200){
      console.log(data)
      setKudos(normalizedData)
    }else{
      console.log("failed")
    }
  }

  const normalizeDataDate = async (data) => {

    for(let i = 0; i<data.length; i++){
      var currEntry = data[i]
      currEntry["createdAt"] = await normalizeDateTime(currEntry["createdAt"])
    }
    return data
  }

  const normalizeDateTime = async (iso) => {
    const date = new Date(iso);
    const year = date.getFullYear();
    var month = date.getMonth()+1;
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
    if(timeHour < 10){
      timeHour = '0' + timeHour;
    }
    if(timeSecond < 10){
      timeSecond = '0' + timeSecond;
    }
    if(timeMinutes < 10){
      timeMinutes = '0' + timeMinutes;
    }

    return (dt + '/' + month + '/' + year + ' ' + timeHour + ':' + timeMinutes + ':' + timeSecond)
  }

  const correctFormat = (variation) => {
    switch(variation) {
      case "fast":
        return "Fast"
        break;
      case "team-player":
        return "Team Player"
        break;
      case "respectful":
        return "Respectful"
        break;
      default:
        return
    }
  }
    return (
     <div className = "main-page-component">
        <div className="container">
            <h3 className="p-3 text-center">Recent Kudos'</h3>
            <table className="table table-striped table-bordered" style= {{"marginTop":"15px"}}>
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


export default RecentKudos;
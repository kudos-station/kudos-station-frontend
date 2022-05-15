import { getCookie } from '../cookie-functions';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import CreateNewKudos from './createnewkudos.component'
import RecentKudos from './recentkudos.component';
import {Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

const MainPage = () => {
    const navigate = useNavigate();
    const [currentUserFullName, setCurrentUserFullName] = useState("")

    useEffect(() => {
        if(!getCookie('kudos-auth')){    
            navigate("/login");
        }
    },[])

    const getSender = async () => {
        const requestOptions = {
          method: 'GET',
          headers: {'Authorization': getCookie('kudos-auth')},
        };
        const base_url = process.env.REACT_APP_KUDOS_BASE_URL
        const res = await fetch(base_url + '/user/profile/', requestOptions)
        const data = await res.json()
        if(res.status === 200){
          setCurrentUserFullName(data["firstName"] + " " + data["lastName"])
        }else{
          console.log("failed")
        }
      }
      getSender()
    return(
        <div className= "main-page">
            <div className= "cnk-bar">
                <h2>Logged in as: <br/><b>{currentUserFullName}</b></h2>
                <Link to="/create-new-kudos"><Button className="btn btn-primary" id="cnk-btn">
                Create New Kudos
                </Button>
                </Link>
            </div>
        <div>
            <RecentKudos />
        </div>
        </div>
    )
};

export default MainPage;
import { getCookie } from '../cookie-functions';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import RecentKudos from './recentkudos.component';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

const MainPage = () => {
    const [currentUserFullName, setCurrentUserFullName] = useState("")
    const navigate = useNavigate();
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
        }
      }
      getSender()
    return(
        <div className= "main-page">
            <div className= "cnk-bar">
                <h2>Logged in as: <br/><b>{currentUserFullName}</b></h2>
                <Link to="/send-kudos"><Button className="btn btn-primary" id="cnk-btn">
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
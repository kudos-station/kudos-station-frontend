import { getCookie } from './cookie-functions';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'

const Scoreboard = () => {
    const [scoreBoard, setScoreBoard] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        if(!getCookie('kudos-auth')){    
            navigate("/login");
        }
    },[])

    useEffect(() => {
        getScoreBoard()
  
    }, [window.location.pathname]);

    const getScoreBoard = async () => {
        const requestOptions = {
          method: 'GET',
          headers: {'Authorization': getCookie('kudos-auth')},
        };
        const base_url = process.env.REACT_APP_KUDOS_BASE_URL
        const res = await fetch(base_url + '/user/scoreboard', requestOptions)
        const data = await res.json()
        if(res.status === 200){
          setScoreBoard(data)
          console.log(data)

        }else{
          console.log("failed")
        }
      }
    return(
        <div className = "main-page-component">
        <div className="container">
            <h3 className="p-3 text-center">Scoreboard</h3>
            <table className="table table-striped table-bordered" style= {{"marginTop":"15px"}}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Kudos Count</th>
                    </tr>
                </thead>
                <tbody>
                    {scoreBoard && scoreBoard.map((scoreBoardN, index) =>
                        <tr key={index}>
                            <td>{scoreBoardN.username}</td>
                            <td>{scoreBoardN.totalCount}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
     </div>
    )
};

export default Scoreboard;
import { getCookie } from './cookie-functions';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react'

const MainPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if(!getCookie('kudos-auth')){    
            navigate("/login");
        }
    },[])

    console.log(getCookie('kudos-auth'))
    return(
    <div>
     <h1>Hello World!</h1>
    </div>
    )
};

export default MainPage;
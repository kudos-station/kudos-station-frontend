import { getCookie, setCookie } from './cookie-functions';
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
    <h1>Hello World!</h1>
    )
};

export default MainPage;
import { Button } from 'react-bootstrap';
import { deleteCookie } from '../cookie-functions'
import { useNavigate } from "react-router-dom";

const LogOutButton = () => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        deleteCookie('kudos-auth')
        navigate("/home");
        window.location.reload();
    }

    return(
        <Button 
        className="btn btn-primary" 
        style= {{"marginRight": "10px", "width": "150px"}}
        onClick={handleLogOut}>
        Log Out
        </Button>
    )
};

export default LogOutButton;
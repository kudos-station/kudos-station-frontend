import { Button } from 'react-bootstrap';
import { deleteCookie } from '../cookie-functions'
import { useNavigate } from "react-router-dom";

const AdminPanelButton = () => {
    const navigate = useNavigate();

    const handleAdminPanel = () => {
        deleteCookie('kudos-auth')
        navigate("/admin-panel");
        window.location.reload();
    }

    return(
        <Button 
        className="btn btn-primary" 
        style= {{"marginRight": "10px", "width": "150px"}}
        onClick={handleAdminPanel}>
        Admin Panel
        </Button>
    )
};

export default AdminPanelButton;
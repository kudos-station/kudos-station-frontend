import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const AdminPanelButton = () => {
    const navigate = useNavigate();

    const handleAdminPanel = () => {
        
        navigate("/admin-panel");
        
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
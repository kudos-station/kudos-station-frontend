import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { getCookie } from '../cookie-functions';
import { useEffect, useState } from 'react';

const AdminPanelButton = () => {
    const navigate = useNavigate();
    
    const [role, setRole] = useState(0)
    useEffect(() => {
        if(!getCookie('kudos-auth')){    
            navigate("/login");
        } else{
            checkRole()
        }
        
    },[])

    const checkRole = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {'Authorization': getCookie('kudos-auth')},
          };
          const base_url = process.env.REACT_APP_KUDOS_BASE_URL
          const res = await fetch(base_url + '/user/profile/', requestOptions)
          const data = await res.json()
          if(res.status === 200){
              if(data["authorities"] === "ROLE_ADMIN"){                  
                setRole(1)
              }            
          }
    }
    
    const handleAdminPanel = () => {
        
        navigate("/admin-panel");
        
    }
    if(role === 1){
        return(
            <Button 
            className="btn btn-primary" 
            id='panel-button'
            style= {{"marginRight": "10px", "width": "150px", "height": "50px"}}
            onClick={handleAdminPanel}>
            Admin
            </Button>
        )
    } else{
        return(
            <div></div>
        )
    }
    
};

export default AdminPanelButton;
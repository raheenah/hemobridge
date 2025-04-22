import { useNavigate } from 'react-router-dom';

export const useRoleNavigation = () => {
    const navigate = useNavigate();
    
    const navigateByRole = (role) => {
        const roleRoutes = {
            "donor": "/user/dashboard",
            "facility-staff": "/facility/dashboard"
        };
        
        const route = roleRoutes[role];
        if (route) navigate(route);
    };
    
    return { navigateByRole };
};
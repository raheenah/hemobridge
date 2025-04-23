import { useNavigate } from 'react-router-dom';

// export const useRoleNavigation = () => {
//     const navigate = useNavigate();
    
//     const navigateByRole = (role) => {
//         const roleRoutes = {
//             "donor": "/user/dashboard",
//             "facility_staff": "/facility/dashboard"
//         };
        
//         const route = roleRoutes[role];
//         if (route) {
//             console.log(route)
//             navigate(route);
//         }
//     };
    
//     return { navigateByRole };
// };

export const useRoleNavigation = (role) => {
  const navigate = useNavigate();
    console.log("role", role);
    console.log("navigating based on role...");
    switch (role) {
      case "donor":
        navigate("/user/dashboard");
        break;
      case "facility_staff":
        navigate("/facility/dashboard");
        break;
     
      default:
        navigate("/"); 
    }
};
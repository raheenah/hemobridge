import { useEffect, useState } from "react";
import { ProfileApi } from "./api/profile.api";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { ProfileContext } from "./shared/context/user-profile-context";

const ProtectedRoute = ({children}) => {
  // const { user } = useAuth();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    ProfileApi.fetchMyProfile()
    .then((data) => setUser(data))
    .catch((error) => {
      console.error(error);
      navigate("/");
    })
    .finally(() => setTimeout(() => setLoading(false), 100));

  }, [navigate]);

  if (loading) return <p>Loading...</p>;
  // console.log("user", user);
  if (!user) return <Navigate to='/' state={{ from: location }} replace />;
 
  //   const path = window.location.pathname;

 
  // if (user.role === "donor" && path.startsWith("/facility")) {
  //   <Navigate to='/user/dashboard' replace />;
  // } else if (user.role !== "donor" && path.startsWith("/user")) {
  //   <Navigate to='/facility/dashboard' replace />;
  // }

  return (
    <ProfileContext.Provider value={{ user }}>
      {children}
    </ProfileContext.Provider>
  );

  // if (!user) return <Navigate to='/' replace />;
  // if (user.role === "donor") {
  //   return window.location.pathname.startsWith("/facility") ? (
  //     <Navigate to='/user/dashboard' replace />
  //   ) : (
  //     <Outlet />
  //   );
  // } else {
  //   return window.location.pathname.startsWith("/user") ? (
  //     <Navigate to='/facility/dashboard' replace />
  //   ) : (
  //     <Outlet />
  //   );
  // }
};

export default ProtectedRoute;

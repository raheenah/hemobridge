import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { ProfileApi } from "./api/profile.api";
import { ProfileContext } from "./shared/context/user-profile-context";

const ProtectedRoute = ({ children }) => {
  // const { user } = useAuth();
  // const { user  } = useProfileContext();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    ProfileApi.fetchMyProfile()
      .then((data) => {
        setUser(data);
        console.log("user data", data);
      })
      .catch((error) => {
        console.error(error);
        throw error;
      })
      .finally(() => setTimeout(() => setLoading(false), 100));

  }, []);

  if (loading) return <p>Loading route.....</p>;

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <ProfileContext.Provider value={{ user }}>
      { children }
    </ProfileContext.Provider>
  )

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

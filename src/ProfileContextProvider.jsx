import { useEffect, useState } from "react";
import { ProfileApi } from "./api/profile.api";
import { Navigate, useLocation } from "react-router-dom";
import { ProfileContext } from "./shared/context/user-profile-context";

const ProfileContextProvider = ({children}) => {
  // const { user } = useAuth();
  // const { profile } = useProfileContext();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  // const navigate = useNavigate();

  useEffect(() => {
    ProfileApi.fetchMyProfile()
      .then((data) => setUser(data))
      .catch((error) => {
        console.error(error);
        // navigate("/");
      })
      .finally(() => setTimeout(() => setLoading(false), 100));
  }, []);

  if (loading) return <p>Loading...</p>;

console.log("user", user);

  if (!user) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  if (user.facilityId) {
    return window.location.pathname.startsWith("/user") ? (
      <Navigate to='/facility/dashboard' replace />
    ) : (
      <ProfileContext.Provider value={{ user }}>
        {children}
      </ProfileContext.Provider>
    );
   
  } else {
    return window.location.pathname.startsWith("/facility") ? (
      <Navigate to='/user/dashboard' replace />
    ) : (
      <ProfileContext.Provider value={{ user }}>
        {children}
      </ProfileContext.Provider>
    );
  }

  // return (
  //   <ProfileContext.Provider value={{ user }}>
  //     {children}
  //   </ProfileContext.Provider>
  // );
};

export default ProfileContextProvider;

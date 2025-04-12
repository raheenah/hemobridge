import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./context";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const { user } = useAuth();
  const location = useLocation();
  const path = location.pathname;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 100);
  }, [user]);

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to='/' state={{ from: location }} replace />;

  if (user.role === "donor") {
    return path.startsWith("/facility") || path.startsWith("/care-giver") ? (
      <Navigate to='/user/dashboard' replace />
    ) : (
      <Outlet />
    );
  } else if (user.role === "healthcare_staff") {
    return path.startsWith("/user") || path.startsWith("/care-giver") ? (
      <Navigate to='/facility/dashboard' replace />
    ) : (
      <Outlet />
    );
  } else if (user.role === "user") {
    return path.startsWith("/facility") || path.startsWith("/care-giver") ? (
      <Navigate to='/care-giver/dashboard' replace />
    ) : (
      <Outlet />
    );
  }
};

export default ProtectedRoute;

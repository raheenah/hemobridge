import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./context";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 100); // Ensure user state updates before rendering
  }, [user]);

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to='/' replace />;
  if (user.role === "donor") {
    return window.location.pathname.startsWith("/facility") ? (
      <Navigate to='/user/dashboard' replace />
    ) : (
      <Outlet />
    );
  } else {
    return window.location.pathname.startsWith("/user") ? (
      <Navigate to='/facility/dashboard' replace />
    ) : (
      <Outlet />
    );
  }
};

export default ProtectedRoute;

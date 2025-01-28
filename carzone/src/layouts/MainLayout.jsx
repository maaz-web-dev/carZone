import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../component/contexts/AuthContext";

const ProtectedRoute = () => {
  const { user } = useAuth();

  // Check for authentication
  if (!user) {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (!storedUser || !storedUser.token) {
      return <Navigate to="/" />; s
    }
  }

 
  return <Outlet />;
};

export default ProtectedRoute;

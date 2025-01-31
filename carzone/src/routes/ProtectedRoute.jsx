import { Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const ProtectedRoute = () => {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  if (!storedUserData?.token) {
    return <Navigate to="/" replace />;
  }

  return <MainLayout />;
};

export default ProtectedRoute;

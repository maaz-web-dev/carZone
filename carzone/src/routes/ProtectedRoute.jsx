import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../component/contexts/AuthContext';

const ProtectedRoute = () => {
  const { user } = useAuth();

  if (!user) {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (!storedUserData?.token) {
      return <Navigate to="/" />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;

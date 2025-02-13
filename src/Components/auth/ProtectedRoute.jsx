import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signup" />;
  }

  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to="/signup" />;
  }

  return children;
};

export default ProtectedRoute;
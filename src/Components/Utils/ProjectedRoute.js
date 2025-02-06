// src/components/ProtectedRoute.js
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../utils/auth';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const isAuth = isAuthenticated();
  const userRole = getUserRole();

  if (!isAuth) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard if role doesn't match
    switch (userRole) {
      case 'manager':
        return <Navigate to="/dashboard-manager" replace />;
      case 'admin':
        return <Navigate to="/dashboard-admin" replace />;
      case 'veterinarian':
        return <Navigate to="/dashboard-vet" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './BasicAuth';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { userId } = useAuth();
  const location = useLocation();

  if (!userId) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
};

export default ProtectedRoute;

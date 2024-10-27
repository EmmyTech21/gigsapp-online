import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../features/auth/authSlice';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { token } = useSelector(selectAuth);

  // If the user is not authenticated, redirect to login
  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;

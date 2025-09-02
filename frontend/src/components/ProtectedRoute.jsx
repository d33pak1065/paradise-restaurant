import React from 'react';
import { Navigate } from 'react-router-dom';

const getUser = () => {
  try { return JSON.parse(localStorage.getItem('paradise_user')) } catch { return null; }
};

const ProtectedRoute = ({ children, adminOnly=false }) => {
  const user = getUser();
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !user.isAdmin) return <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;

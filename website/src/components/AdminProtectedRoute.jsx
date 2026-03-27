import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('admin_token');
  
  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  // Check token expiry
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem('admin_token');
      return <Navigate to="/admin" replace />;
    }
  } catch {
    localStorage.removeItem('admin_token');
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default AdminProtectedRoute;

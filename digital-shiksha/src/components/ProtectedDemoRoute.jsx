// src/components/ProtectedDemoRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Demo protected route – redirects to /login if no user is logged in.
 * Since this is a frontend‑only demo, the protection is purely client‑side.
 */
export const ProtectedDemoRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    // Simple loading placeholder
    return <div className="flex items-center justify-center h-screen"><span className="text-lg">Loading...</span></div>;
  }

  if (!user) {
    // Preserve the intended destination so after login we can redirect back
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

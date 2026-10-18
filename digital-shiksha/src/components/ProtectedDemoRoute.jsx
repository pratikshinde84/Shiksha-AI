// src/components/ProtectedDemoRoute.jsx
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * Demo protected route — redirects to /login if no user is logged in.
 * Shows a styled loading screen while auth state is being resolved.
 */
export const ProtectedDemoRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-4">
        <div className="text-5xl animate-pulse-slow">🎓</div>
        <p className="text-gray-600 text-sm font-medium">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

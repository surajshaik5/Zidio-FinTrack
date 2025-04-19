import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

/**
 * Protected Route component to secure routes based on authentication
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {object} props.user - User object (null if not authenticated)
 * @param {string} props.requiredRole - Role required to access the component (optional)
 * @returns {React.ReactNode} - The protected route component
 */
const ProtectedRoute = ({ children, user, requiredRole }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is not authenticated, redirect to login
    if (!user) {
      navigate('/login', { state: { from: location } });
    }
    
    // If required role is specified and user doesn't have it
    if (user && requiredRole && user.role !== requiredRole) {
      navigate('/dashboard');
    }
  }, [user, requiredRole, location, navigate]);

  // If user is authenticated, render children
  return user ? children : null;
};

export default ProtectedRoute; 
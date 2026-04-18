import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div style={{ padding: '80px', textAlign: 'center', color: 'var(--muted)' }}>Loading...</div>;
  if (!user)   return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}

export function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div style={{ padding: '80px', textAlign: 'center', color: 'var(--muted)' }}>Loading...</div>;
  if (!user)           return <Navigate to="/login" state={{ from: location }} replace />;
  if (user.role !== 'admin') return <Navigate to="/" replace />;
  return children;
}

export default PrivateRoute;

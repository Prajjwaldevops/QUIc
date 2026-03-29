import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLoaded: clerkLoaded, isSignedIn } = useUser();
  const { userProfile, loading } = useAuth();

  // Wait for both Clerk and AuthContext to load
  if (!clerkLoaded || loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Not signed in with Clerk → go to sign in
  if (!isSignedIn) {
    return <Navigate to="/signin" replace />;
  }

  // Signed in with Clerk but no Supabase profile yet
  // (could happen if profile insert failed or user registered via Clerk only)
  if (!userProfile) {
    return <Navigate to="/register" replace />;
  }

  return children;
};

export default ProtectedRoute;

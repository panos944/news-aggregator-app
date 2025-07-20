import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from './LoginForm';
import { useState } from 'react';
import RegisterForm from './RegisterForm';

interface PrivateRouteProps {
  children: React.ReactNode;
}

/**
 * PrivateRoute Component
 * Protects routes that require authentication
 * Shows login/register forms if user is not authenticated
 */
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-blue-900 flex items-center justify-center">
        <div className="text-white text-xl">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          Φόρτωση...
        </div>
      </div>
    );
  }

  // If not authenticated, show login/register forms
  if (!isAuthenticated) {
    return (
      <>
        {isLoginMode ? (
          <LoginForm onToggleMode={() => setIsLoginMode(false)} />
        ) : (
          <RegisterForm onToggleMode={() => setIsLoginMode(true)} />
        )}
      </>
    );
  }

  // If authenticated, render the protected content
  return <>{children}</>;
};

export default PrivateRoute;
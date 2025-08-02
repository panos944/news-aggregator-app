import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loginWithToken } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get('token');
      const userStr = searchParams.get('user');
      const error = searchParams.get('error');

      if (error) {
        console.error('OAuth error:', error);
        navigate('/login?error=auth_failed');
        return;
      }

      if (token && userStr) {
        try {
          const user = JSON.parse(decodeURIComponent(userStr));
          const result = await loginWithToken(token, user);
          
          if (result.success) {
            navigate('/'); // Redirect to home page
          } else {
            navigate('/login?error=token_invalid');
          }
        } catch (error) {
          console.error('Token parsing error:', error);
          navigate('/login?error=token_invalid');
        }
      } else {
        navigate('/login?error=missing_data');
      }
    };

    handleCallback();
  }, [searchParams, navigate, loginWithToken]);

  return (
    <div className="min-h-screen bg-blue-900 flex items-center justify-center">
      <div className="text-white text-xl">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
        Επεξεργασία σύνδεσης...
      </div>
    </div>
  );
};

export default AuthCallback; 
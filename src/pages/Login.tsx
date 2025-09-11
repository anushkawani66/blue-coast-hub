import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { LoginCard } from '@/components/auth/LoginCard';
import { UserType } from '@/types/auth';
import { useAuth } from '@/contexts/AuthContext';

const Login: React.FC = () => {
  const { userType } = useParams<{ userType: string }>();
  const { user } = useAuth();

  // Redirect if already logged in
  if (user) {
    return <Navigate to={`/${user.type}/dashboard`} replace />;
  }

  // Validate user type
  if (!userType || !['ngo', 'government', 'corporate'].includes(userType)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <LoginCard userType={userType as UserType} />
      </div>
    </div>
  );
};

export default Login;
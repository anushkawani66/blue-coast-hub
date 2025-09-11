import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User, UserType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string, type: UserType) => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        email,
        name: getMockUserName(type, email),
        type,
        organization: getMockOrganization(type),
        verified: type === 'government',
        avatar: `/api/placeholder/40/40`
      };
      
      setUser(mockUser);
      setUserType(type);
      localStorage.setItem('bluetrust_user', JSON.stringify(mockUser));
      localStorage.setItem('bluetrust_user_type', type);
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
    localStorage.removeItem('bluetrust_user');
    localStorage.removeItem('bluetrust_user_type');
  };

  const getMockUserName = (type: UserType, email: string): string => {
    switch (type) {
      case 'ngo':
        return 'Sunita Devi';
      case 'government':
        return 'Dr. Anand Sharma';
      case 'corporate':
        return 'Priya Singh';
      default:
        return email.split('@')[0];
    }
  };

  const getMockOrganization = (type: UserType): string => {
    switch (type) {
      case 'ngo':
        return 'Sundarbans Conservation Society';
      case 'government':
        return 'National Centre for Sustainable Coastal Management';
      case 'corporate':
        return 'TechCorp India Pvt Ltd';
      default:
        return '';
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('bluetrust_user');
    const savedUserType = localStorage.getItem('bluetrust_user_type');
    
    if (savedUser && savedUserType) {
      setUser(JSON.parse(savedUser));
      setUserType(savedUserType as UserType);
    }
  }, []);

  const value: AuthContextType = {
    user,
    userType,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
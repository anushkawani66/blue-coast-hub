import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserType } from '@/types/auth';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Loader2, Shield, Users, Building2, UserPlus, LogIn } from 'lucide-react';

interface LoginCardProps {
  userType: UserType;
}

const getUserTypeConfig = (type: UserType) => {
  switch (type) {
    case 'ngo':
      return {
        title: 'NGO & Community Portal',
        description: 'Access your restoration projects and carbon credit wallet',
        icon: Users,
        gradient: 'gradient-nature',
        placeholder: 'community@example.org'
      };
    case 'government':
      return {
        title: 'Government Verifier Portal',
        description: 'Verify projects and manage the national carbon registry',
        icon: Shield,
        gradient: 'gradient-ocean',
        placeholder: 'official@nccr.gov.in'
      };
    case 'corporate':
      return {
        title: 'Corporate Buyer Portal',
        description: 'Purchase verified carbon credits for your ESG goals',
        icon: Building2,
        gradient: 'gradient-trust',
        placeholder: 'sustainability@company.com'
      };
  }
};

export const LoginCard: React.FC<LoginCardProps> = ({ userType }) => {
  const [activeTab, setActiveTab] = useState('login');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Signup form state
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const config = getUserTypeConfig(userType);
  const Icon = config.icon;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast({
        title: 'Missing Information',
        description: 'Please enter both email and password.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await login(loginEmail, loginPassword, userType);
      toast({
        title: 'Welcome to BlueTrust',
        description: 'Successfully logged in to your dashboard.',
      });
      navigate(`/${userType}/dashboard`);
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupEmail || !signupPassword || !confirmPassword || !fullName) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    if (signupPassword !== confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'Passwords do not match. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    if (signupPassword.length < 6) {
      toast({
        title: 'Weak Password',
        description: 'Password must be at least 6 characters long.',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Simulate signup process
      await new Promise(resolve => setTimeout(resolve, 1000));
      await login(signupEmail, signupPassword, userType);
      toast({
        title: 'Account Created Successfully',
        description: 'Welcome to BlueTrust! Your account has been created.',
      });
      navigate(`/${userType}/dashboard`);
    } catch (error) {
      toast({
        title: 'Signup Failed',
        description: 'Unable to create account. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full max-w-md card-elevated">
      <CardHeader className="space-y-4 text-center">
        <div className={`w-16 h-16 mx-auto rounded-2xl ${config.gradient} flex items-center justify-center shadow-medium`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div>
          <CardTitle className="text-2xl font-bold text-neutral-900">
            {config.title}
          </CardTitle>
          <CardDescription className="text-neutral-600 mt-2">
            {config.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" className="flex items-center gap-2">
              <LogIn className="w-4 h-4" />
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-6 mt-6">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-sm font-medium text-neutral-700">
                  Email Address
                </Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder={config.placeholder}
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="h-12"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-sm font-medium text-neutral-700">
                  Password
                </Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full h-12 text-white font-semibold ${config.gradient} hover:opacity-90 transition-all duration-300 shadow-medium hover:shadow-strong`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In to Dashboard'
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-6 mt-6">
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="signup-name" className="text-sm font-medium text-neutral-700">
                  Full Name
                </Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-sm font-medium text-neutral-700">
                  Email Address
                </Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder={config.placeholder}
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization" className="text-sm font-medium text-neutral-700">
                  Organization {userType === 'ngo' ? '(Optional)' : ''}
                </Label>
                <Input
                  id="organization"
                  type="text"
                  placeholder={userType === 'ngo' ? 'Your NGO/Community name' : 
                              userType === 'government' ? 'Government department' : 
                              'Company name'}
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-sm font-medium text-neutral-700">
                  Password
                </Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Create a strong password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-sm font-medium text-neutral-700">
                  Confirm Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full h-12 text-white font-semibold ${config.gradient} hover:opacity-90 transition-all duration-300 shadow-medium hover:shadow-strong`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-500">
            Demo mode: Use any credentials to continue
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
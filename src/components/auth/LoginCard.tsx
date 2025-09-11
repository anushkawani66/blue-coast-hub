import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserType } from '@/types/auth';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Loader2, Shield, Users, Building2 } from 'lucide-react';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const config = getUserTypeConfig(userType);
  const Icon = config.icon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: 'Missing Information',
        description: 'Please enter both email and password.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await login(email, password, userType);
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-neutral-700">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={config.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-neutral-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-500">
            Demo credentials: Use any email and password
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
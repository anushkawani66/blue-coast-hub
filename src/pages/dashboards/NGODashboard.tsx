import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Camera, 
  TrendingUp, 
  Wallet, 
  Plus, 
  FileText,
  CheckCircle,
  Clock,
  Users,
  Leaf
} from 'lucide-react';

const NGODashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const stats = [
    {
      title: 'Total Credits Earned',
      value: '2,847',
      change: '+12.5%',
      icon: TrendingUp,
      color: 'text-mangrove-green'
    },
    {
      title: 'Credits for Sale',
      value: '1,203',
      change: 'Available',
      icon: Wallet,
      color: 'text-trust-gold'
    },
    {
      title: 'Active Projects', 
      value: '7',
      change: '2 pending verification',
      icon: MapPin,
      color: 'text-ocean-blue'
    },
    {
      title: 'Community Members',
      value: '234',
      change: '+18 this month',
      icon: Users,
      color: 'text-mangrove-medium'
    }
  ];

  const projects = [
    {
      id: 1,
      name: 'Sagar Mangrove Restoration',
      location: 'Sundarbans, West Bengal',
      status: 'approved',
      credits: 847,
      hectares: 15.2,
      image: '/api/placeholder/400/200'
    },
    {
      id: 2,
      name: 'Coastal Protection Initiative',
      location: 'Bhitarkanika, Odisha',
      status: 'pending',
      credits: 0,
      hectares: 8.7,
      image: '/api/placeholder/400/200'
    },
    {
      id: 3,
      name: 'Community Mangrove Farm',
      location: 'Pichavaram, Tamil Nadu',
      status: 'approved',
      credits: 623,
      hectares: 12.1,
      image: '/api/placeholder/400/200'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-mangrove-light text-mangrove-dark">Approved</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-trust-gold text-trust-gold">Pending</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">
              Welcome back, {user?.name}
            </h1>
            <p className="text-neutral-600">{user?.organization}</p>
          </div>
          <Button onClick={logout} variant="outline">
            Logout
          </Button>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="stats-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-neutral-600">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-neutral-900 mb-1">
                    {stat.value}
                  </div>
                  <p className="text-xs text-neutral-500">
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-mangrove-green" />
                Register New Restoration Site
              </CardTitle>
              <CardDescription>
                Start a new mangrove restoration project and begin earning carbon credits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full gradient-nature text-white font-semibold">
                <MapPin className="w-4 h-4 mr-2" />
                Register Project
              </Button>
            </CardContent>
          </Card>

          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-ocean-blue" />
                Submit Monitoring Report
              </CardTitle>
              <CardDescription>
                Upload photos and data from your latest site monitoring visit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full gradient-ocean text-white font-semibold">
                <Camera className="w-4 h-4 mr-2" />
                Upload Report
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* My Restorations */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-mangrove-green" />
              My Restoration Projects
            </CardTitle>
            <CardDescription>
              Track the progress of your mangrove restoration initiatives
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="card-premium">
                  <div className="aspect-video bg-gradient-nature rounded-lg mb-4 flex items-center justify-center">
                    <Leaf className="w-8 h-8 text-white" />
                  </div>
                  <CardHeader className="pt-0">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      {getStatusBadge(project.status)}
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {project.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-neutral-600">Credits Earned</p>
                        <p className="font-semibold text-mangrove-green">{project.credits}</p>
                      </div>
                      <div>
                        <p className="text-neutral-600">Area Restored</p>
                        <p className="font-semibold text-ocean-blue">{project.hectares} ha</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="card-premium mt-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-mangrove-surface rounded-lg">
                <CheckCircle className="w-5 h-5 text-mangrove-green" />
                <div>
                  <p className="font-medium">Report approved for Sagar Mangrove Restoration</p>
                  <p className="text-sm text-neutral-600">2 hours ago • +45 credits earned</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-ocean-surface rounded-lg">
                <Clock className="w-5 h-5 text-ocean-blue" />
                <div>
                  <p className="font-medium">New monitoring report submitted</p>
                  <p className="text-sm text-neutral-600">1 day ago • Coastal Protection Initiative</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-trust-gold/10 rounded-lg">
                <Wallet className="w-5 h-5 text-trust-gold" />
                <div>
                  <p className="font-medium">200 credits sold to TechCorp India</p>
                  <p className="text-sm text-neutral-600">3 days ago • ₹8,000 received</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NGODashboard;
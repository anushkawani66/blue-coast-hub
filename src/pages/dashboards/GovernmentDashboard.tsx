import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProjectVerification } from '@/components/verification/ProjectVerification';
import { 
  Shield, 
  Globe, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Eye,
  Users,
  Leaf,
  BarChart3,
  Clock,
  MapPin,
  FileCheck
} from 'lucide-react';

const GovernmentDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const kpis = [
    {
      title: 'Total Projects',
      value: '1,247',
      change: '+23 this month',
      icon: Globe,
      color: 'text-ocean-blue'
    },
    {
      title: 'Pending Verifications',
      value: '34',
      change: 'Requires attention',
      icon: Clock,
      color: 'text-trust-gold'
    },
    {
      title: 'Total CO₂ Sequestered',
      value: '2.5M tons',
      change: '+15.2% this quarter',
      icon: Leaf,
      color: 'text-mangrove-green'
    },
    {
      title: 'Marketplace Volume',
      value: '₹4.2 Cr',
      change: 'Last 30 days',
      icon: TrendingUp,
      color: 'text-trust-sunrise'
    }
  ];

  const verificationQueue = [
    {
      id: 1,
      name: 'Mangrove Restoration Delta',
      ngo: 'Coastal Conservation NGO',
      location: 'Kutch, Gujarat',
      submittedDate: '2 hours ago',
      reportType: 'Monitoring Report',
      priority: 'high',
      status: 'pending',
      hectaresRestored: 12.5,
      treesPlanted: 3420,
      carbonCredits: 450,
      communityMembers: 85,
      images: ['img1.jpg', 'img2.jpg', 'img3.jpg'],
      description: 'Comprehensive mangrove restoration project focusing on degraded coastal areas in the Kutch region.',
      gpsCoordinates: '23.0225°N, 68.7167°E',
      previousReports: 3
    },
    {
      id: 2,
      name: 'Community Mangrove Initiative',
      ngo: 'Sundarbans Welfare Society',
      location: 'Sundarbans, West Bengal',
      submittedDate: '1 day ago',
      reportType: 'Site Registration',
      priority: 'medium',
      status: 'pending',
      hectaresRestored: 8.3,
      treesPlanted: 2150,
      carbonCredits: 320,
      communityMembers: 142,
      images: ['img1.jpg', 'img2.jpg'],
      description: 'Community-led mangrove plantation program involving local fishermen and women self-help groups.',
      gpsCoordinates: '21.9497°N, 88.2636°E',
      previousReports: 1
    },
    {
      id: 3,
      name: 'Backwater Restoration Program',
      ngo: 'Kerala Marine Foundation',
      location: 'Kochi, Kerala',
      submittedDate: '2 days ago',
      reportType: 'Progress Update',
      priority: 'low',
      status: 'pending',
      hectaresRestored: 6.8,
      treesPlanted: 1890,
      carbonCredits: 280,
      communityMembers: 67,
      images: ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg'],
      description: 'Restoration of degraded backwater ecosystems through native mangrove species plantation.',
      gpsCoordinates: '9.9312°N, 76.2673°E',
      previousReports: 5
    }
  ];

  const handleApproveProject = (projectId: number, comments: string, creditsAwarded: number) => {
    console.log(`Approved project ${projectId} with ${creditsAwarded} credits: ${comments}`);
    // Update project status in real implementation
  };

  const handleRejectProject = (projectId: number, reason: string) => {
    console.log(`Rejected project ${projectId}: ${reason}`);
    // Update project status in real implementation
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-700 border-red-200">High Priority</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Low Priority</Badge>;
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
              Government Verification Portal
            </h1>
            <p className="text-neutral-600">{user?.name} • {user?.organization}</p>
          </div>
          <Button onClick={logout} variant="outline">
            Logout
          </Button>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <Card key={index} className="stats-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-neutral-600">
                    {kpi.title}
                  </CardTitle>
                  <Icon className={`w-5 h-5 ${kpi.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-neutral-900 mb-1">
                    {kpi.value}
                  </div>
                  <p className="text-xs text-neutral-500">
                    {kpi.change}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Verification Queue */}
        <Card className="card-elevated mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-ocean-blue" />
              Verification Queue
              <Badge className="bg-trust-gold/20 text-trust-gold">
                {verificationQueue.length} Pending
              </Badge>
            </CardTitle>
            <CardDescription>
              Projects and reports awaiting verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {verificationQueue.map((item) => (
                <div key={item.id} className="card-premium p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-neutral-900">{item.name}</h3>
                      <p className="text-sm text-neutral-600 flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {item.ngo}
                      </p>
                    </div>
                    {getPriorityBadge(item.priority)}
                  </div>
                  
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-neutral-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {item.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileCheck className="w-4 h-4" />
                          {item.reportType}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {item.submittedDate}
                        </span>
                      </div>
                      
                      <Button 
                        onClick={() => setSelectedProject(item)}
                        className="gradient-ocean text-white"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Review
                      </Button>
                    </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* National Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* State-wise Performance */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-mangrove-green" />
                State-wise Performance
              </CardTitle>
              <CardDescription>
                Top performing states in blue carbon restoration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { state: 'West Bengal', projects: 342, credits: '847K', growth: '+12%' },
                  { state: 'Gujarat', projects: 289, credits: '723K', growth: '+18%' },
                  { state: 'Odisha', projects: 234, credits: '612K', growth: '+8%' },
                  { state: 'Tamil Nadu', projects: 198, credits: '534K', growth: '+15%' },
                  { state: 'Kerala', projects: 184, credits: '487K', growth: '+22%' }
                ].map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-neutral-900">{stat.state}</p>
                      <p className="text-sm text-neutral-600">{stat.projects} projects</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-mangrove-green">{stat.credits}</p>
                      <p className="text-sm text-trust-gold">{stat.growth}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-ocean-blue" />
                System Status
              </CardTitle>
              <CardDescription>
                Platform health and verification metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-mangrove-surface rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-mangrove-green" />
                    <span className="font-medium">Verification System</span>
                  </div>
                  <Badge className="bg-mangrove-light text-mangrove-dark">Operational</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-ocean-surface rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-ocean-blue" />
                    <span className="font-medium">Satellite Data Feed</span>
                  </div>
                  <Badge className="bg-ocean-light text-ocean-deep">Active</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-trust-gold/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-trust-gold" />
                    <span className="font-medium">AI Analysis Engine</span>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-700">Maintenance</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-mangrove-surface rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-mangrove-green" />
                    <span className="font-medium">Blockchain Network</span>
                  </div>
                  <Badge className="bg-mangrove-light text-mangrove-dark">Verified</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Verification Modal */}
        {selectedProject && (
          <ProjectVerification
            project={selectedProject}
            onApprove={handleApproveProject}
            onReject={handleRejectProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </div>
  );
};

export default GovernmentDashboard;
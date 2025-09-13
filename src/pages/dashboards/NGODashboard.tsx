import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import NewProjectModal from '@/components/project/NewProjectModal';
import { 
  MapPin, 
  Camera, 
  TrendingUp, 
  Plus, 
  CheckCircle,
  Clock,
  Leaf
} from 'lucide-react';

const NGODashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Sagar Mangrove Restoration',
      location: 'Sundarbans, West Bengal',
      status: 'approved',
      credits: 847,
      hectares: 15.2,
      submittedDate: '2 days ago'
    },
    {
      id: 2,
      name: 'Coastal Protection Initiative',
      location: 'Bhitarkanika, Odisha',
      status: 'pending',
      credits: 0,
      hectares: 8.7,
      submittedDate: '1 week ago'
    },
    {
      id: 3,
      name: 'Community Mangrove Farm',
      location: 'Pichavaram, Tamil Nadu',
      status: 'approved',
      credits: 623,
      hectares: 12.1,
      submittedDate: '2 weeks ago'
    }
  ]);

  const creditStats = [
    {
      title: 'Total Credits Earned',
      value: '2,847',
      change: '+12.5%',
      icon: TrendingUp,
      color: 'text-mangrove-green'
    }
  ];


  const activities = [
    {
      id: 1,
      action: 'Report approved for Sagar Mangrove Restoration',
      time: '2 hours ago',
      details: '+45 credits earned',
      icon: CheckCircle,
      color: 'text-mangrove-green'
    },
    {
      id: 2,
      action: 'New monitoring report submitted',
      time: '1 day ago',
      details: 'Coastal Protection Initiative',
      icon: Camera,
      color: 'text-ocean-blue'
    },
    {
      id: 3,
      action: 'Project registration completed',
      time: '3 days ago',
      details: 'Community Mangrove Farm',
      icon: Leaf,
      color: 'text-mangrove-green'
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

  const handleNewProject = () => {
    setShowNewProjectModal(true);
  };

  const handleProjectSubmit = (projectData: any) => {
    const newProject = {
      id: projects.length + 1,
      name: projectData.name,
      location: `${projectData.location.lat.toFixed(2)}, ${projectData.location.lng.toFixed(2)}`,
      status: 'pending',
      credits: 0,
      hectares: Math.random() * 20 + 5, // Mock hectares for now
      submittedDate: 'Just now'
    };

    setProjects(prev => [newProject, ...prev]);
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

      <div className="p-6 max-w-6xl mx-auto">
        {/* Credits Stats */}
        <div className="mb-8">
          {creditStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="stats-card max-w-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-neutral-600">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-neutral-900 mb-1">
                    {stat.value}
                  </div>
                  <p className="text-sm text-neutral-500">
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* New Project Button */}
        <div className="mb-8">
          <Button 
            onClick={handleNewProject}
            className="gradient-nature text-white font-semibold h-16 px-8 text-lg"
          >
            <Plus className="w-6 h-6 mr-3" />
            New Project
          </Button>
        </div>

        {/* My Projects */}
        <Card className="card-elevated mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-mangrove-green" />
              My Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="card-premium p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{project.name}</h3>
                    {getStatusBadge(project.status)}
                  </div>
                  <p className="text-neutral-600 flex items-center gap-1 mb-3">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-neutral-600">Credits</p>
                      <p className="font-semibold text-mangrove-green">{project.credits}</p>
                    </div>
                    <div>
                      <p className="text-neutral-600">Area</p>
                      <p className="font-semibold text-ocean-blue">{project.hectares} ha</p>
                    </div>
                    <div>
                      <p className="text-neutral-600">Submitted</p>
                      <p className="font-semibold">{project.submittedDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* My Activity */}
        <Card className="card-premium">
          <CardHeader>
            <CardTitle>My Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                    <Icon className={`w-5 h-5 ${activity.color}`} />
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-neutral-600">{activity.time} • {activity.details}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* New Project Modal */}
        <NewProjectModal 
          isOpen={showNewProjectModal}
          onClose={() => setShowNewProjectModal(false)}
          onSubmit={handleProjectSubmit}
        />
      </div>
    </div>
  );
};

export default NGODashboard;
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  ShoppingCart, 
  TrendingUp, 
  Award, 
  Eye,
  Download,
  Users,
  Leaf,
  Star,
  MapPin,
  Calendar,
  DollarSign
} from 'lucide-react';

const CorporateDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const portfolioStats = [
    {
      title: 'Total Credits Purchased',
      value: '5,420',
      change: '+284 this month',
      icon: ShoppingCart,
      color: 'text-ocean-blue'
    },
    {
      title: 'Portfolio Value',
      value: '₹21.68 L',
      change: '+12.3% this quarter',
      icon: TrendingUp,
      color: 'text-mangrove-green'
    },
    {
      title: 'Credits Retired',
      value: '3,200',
      change: 'For ESG reporting',
      icon: Award,
      color: 'text-trust-gold'
    },
    {
      title: 'CO₂ Impact',
      value: '3,200 tons',
      change: 'Offset achieved',
      icon: Leaf,
      color: 'text-mangrove-medium'
    }
  ];

  const availableProjects = [
    {
      id: 1,
      name: 'Sundarbans Mangrove Conservation',
      location: 'West Bengal, India',
      ngo: 'Sundarbans Conservation Society',
      rating: 4.9,
      price: 40,
      available: 850,
      impact: 'Biodiversity Protection',
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      name: 'Coastal Resilience Initiative',
      location: 'Gujarat, India',
      ngo: 'Coastal Protection Foundation',
      rating: 4.7,
      price: 35,
      available: 1200,
      impact: 'Community Employment',
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      name: 'Backwater Restoration Program',
      location: 'Kerala, India',
      ngo: 'Kerala Marine Foundation',
      rating: 4.8,
      price: 45,
      available: 650,
      impact: 'Women Empowerment',
      image: '/api/placeholder/300/200'
    }
  ];

  const ownedCredits = [
    {
      id: 1,
      project: 'Sagar Mangrove Restoration',
      credits: 500,
      purchaseDate: '2024-01-15',
      value: '₹20,000',
      status: 'active'
    },
    {
      id: 2,
      project: 'Coastal Protection Initiative',
      credits: 750,
      purchaseDate: '2024-02-20',
      value: '₹26,250',
      status: 'active'
    },
    {
      id: 3,
      project: 'Community Mangrove Farm',
      credits: 300,
      purchaseDate: '2024-01-28',
      value: '₹13,500',
      status: 'retired'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-ocean-light text-ocean-deep">Active</Badge>;
      case 'retired':
        return <Badge className="bg-neutral-200 text-neutral-700">Retired</Badge>;
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
              Corporate ESG Portal
            </h1>
            <p className="text-neutral-600">{user?.name} • {user?.organization}</p>
          </div>
          <Button onClick={logout} variant="outline">
            Logout
          </Button>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {portfolioStats.map((stat, index) => {
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

        {/* Marketplace Gallery */}
        <Card className="card-elevated mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-trust-gold" />
              Carbon Credit Marketplace
            </CardTitle>
            <CardDescription>
              High-quality, verified carbon credits from mangrove restoration projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableProjects.map((project) => (
                <Card key={project.id} className="card-premium">
                  <div className="aspect-video bg-gradient-nature rounded-lg mb-4 flex items-center justify-center">
                    <Leaf className="w-8 h-8 text-white" />
                  </div>
                  
                  <CardHeader className="pt-0">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-lg leading-tight">{project.name}</CardTitle>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 fill-trust-gold text-trust-gold" />
                        <span className="font-medium">{project.rating}</span>
                      </div>
                    </div>
                    
                    <CardDescription className="space-y-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {project.ngo}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-neutral-600">Price per credit</span>
                        <span className="font-bold text-trust-gold">₹{project.price}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-neutral-600">Available</span>
                        <span className="font-semibold">{project.available} credits</span>
                      </div>
                      
                      <Badge className="w-full justify-center bg-mangrove-light text-mangrove-dark">
                        Co-benefit: {project.impact}
                      </Badge>
                      
                      <Button className="w-full gradient-trust text-white font-semibold">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Portfolio & Reporting */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Owned Credits */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-6 h-6 text-ocean-blue" />
                My Carbon Credit Portfolio
              </CardTitle>
              <CardDescription>
                Your purchased and retired carbon credits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ownedCredits.map((credit) => (
                  <div key={credit.id} className="card-premium p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-neutral-900">{credit.project}</h3>
                        <p className="text-sm text-neutral-600 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Purchased on {new Date(credit.purchaseDate).toLocaleDateString()}
                        </p>
                      </div>
                      {getStatusBadge(credit.status)}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Leaf className="w-4 h-4 text-mangrove-green" />
                          {credit.credits} credits
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-trust-gold" />
                          {credit.value}
                        </span>
                      </div>
                      
                      {credit.status === 'active' && (
                        <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                          Retire Credits
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ESG Reporting */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-mangrove-green" />
                ESG Reporting
              </CardTitle>
              <CardDescription>
                Generate reports for your sustainability disclosures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-gradient-surface rounded-lg">
                  <h3 className="font-semibold text-neutral-900 mb-2">Impact Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-neutral-600">Total CO₂ Offset</p>
                      <p className="font-bold text-mangrove-green">3,200 tons</p>
                    </div>
                    <div>
                      <p className="text-neutral-600">Mangroves Supported</p>
                      <p className="font-bold text-ocean-blue">45.7 hectares</p>
                    </div>
                    <div>
                      <p className="text-neutral-600">Communities Impacted</p>
                      <p className="font-bold text-trust-gold">850 people</p>
                    </div>
                    <div>
                      <p className="text-neutral-600">Investment Value</p>
                      <p className="font-bold text-neutral-900">₹21.68 L</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full gradient-ocean text-white font-semibold">
                    <Download className="w-4 h-4 mr-2" />
                    Download Q4 2024 Report
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    View on Blockchain
                  </Button>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Certification Ready:</strong> Your carbon credits are verified and blockchain-recorded, 
                    perfect for CDP, GRI, and TCFD reporting standards.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CorporateDashboard;
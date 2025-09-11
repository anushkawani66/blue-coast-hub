import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Shield, Building2, Leaf, Globe, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
  const portals = [
    {
      type: 'ngo',
      title: 'NGO & Community',
      description: 'Register restoration sites, monitor progress, and earn carbon credits',
      icon: Users,
      gradient: 'gradient-nature',
      features: ['Project Registration', 'Site Monitoring', 'Credit Wallet', 'Mobile Optimized']
    },
    {
      type: 'government',
      title: 'Government Verifier',
      description: 'Verify projects, manage the national registry, and ensure transparency',
      icon: Shield,
      gradient: 'gradient-ocean',
      features: ['Satellite Verification', 'AI Analysis', 'Registry Management', 'Audit Trail']
    },
    {
      type: 'corporate',
      title: 'Corporate Buyer',
      description: 'Purchase verified carbon credits for your ESG and sustainability goals',
      icon: Building2,
      gradient: 'gradient-trust',
      features: ['Carbon Marketplace', 'Impact Reports', 'ESG Documentation', 'Blockchain Verified']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
              Blue<span className="text-ocean-blue">Trust</span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              India's Premier Blockchain Platform for Blue Carbon Credits
            </p>
            <p className="text-lg text-neutral-500 mt-4 max-w-2xl mx-auto">
              Connecting coastal communities, government verifiers, and corporations 
              in the fight against climate change through mangrove restoration.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            <div className="card-premium text-center">
              <div className="w-12 h-12 bg-gradient-nature rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900">50,000+</h3>
              <p className="text-neutral-600">Hectares Restored</p>
            </div>
            <div className="card-premium text-center">
              <div className="w-12 h-12 bg-gradient-ocean rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900">12 States</h3>
              <p className="text-neutral-600">Across India</p>
            </div>
            <div className="card-premium text-center">
              <div className="w-12 h-12 bg-gradient-trust rounded-xl mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>  
              <h3 className="text-2xl font-bold text-neutral-900">2.5M+</h3>
              <p className="text-neutral-600">CO₂ Tons Sequestered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portal Selection */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Choose Your Portal
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Access the platform that's designed specifically for your role in the blue carbon ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portals.map((portal) => {
              const Icon = portal.icon;
              return (
                <Card key={portal.type} className="card-elevated hover:shadow-strong transition-all duration-300 group">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-2xl ${portal.gradient} flex items-center justify-center shadow-medium group-hover:shadow-strong transition-all duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-neutral-900 mt-4">
                      {portal.title}
                    </CardTitle>
                    <CardDescription className="text-neutral-600">
                      {portal.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {portal.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-neutral-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-ocean-medium mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link to={`/login/${portal.type}`} className="block">
                      <Button className={`w-full ${portal.gradient} text-white font-semibold hover:opacity-90 transition-all duration-300 shadow-medium hover:shadow-strong`}>
                        Access {portal.title} Portal
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-neutral-200">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-neutral-500">
            Built for Smart India Hackathon 2024 • Empowering India's Blue Economy
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
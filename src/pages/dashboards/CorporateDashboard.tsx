import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CarbonMarketplace } from '@/components/marketplace/CarbonMarketplace';
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
  const [userBalance, setUserBalance] = useState(2500000); // ₹25,00,000
  const [userOwnedCredits, setUserOwnedCredits] = useState(1550);
  const [totalEarnings, setTotalEarnings] = useState(485000); // ₹4,85,000

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
      value: `₹${(userBalance/100000).toFixed(2)} L`,
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
      title: 'Total Earnings',
      value: `₹${(totalEarnings/100000).toFixed(2)} L`,
      change: 'From credit sales',
      icon: Leaf,
      color: 'text-mangrove-medium'
    }
  ];

  const availableCredits = [
    {
      id: 1,
      projectName: 'Sundarbans Mangrove Conservation',
      location: 'West Bengal, India',
      ngo: 'Sundarbans Conservation Society',
      rating: 4.9,
      pricePerCredit: 40,
      availableCredits: 850,
      totalCredits: 1200,
      cobenefits: ['Biodiversity Protection', 'Storm Surge Defense'],
      verificationDate: '2024-01-15',
      impact: {
        hectares: 15.2,
        trees: 3420,
        community: 185
      }
    },
    {
      id: 2,
      projectName: 'Coastal Resilience Initiative',
      location: 'Gujarat, India',
      ngo: 'Coastal Protection Foundation',
      rating: 4.7,
      pricePerCredit: 35,
      availableCredits: 1200,
      totalCredits: 1500,
      cobenefits: ['Community Employment', 'Fisheries Enhancement'],
      verificationDate: '2024-02-08',
      impact: {
        hectares: 22.1,
        trees: 4850,
        community: 342
      }
    },
    {
      id: 3,
      projectName: 'Backwater Restoration Program',
      location: 'Kerala, India',
      ngo: 'Kerala Marine Foundation',
      rating: 4.8,
      pricePerCredit: 45,
      availableCredits: 650,
      totalCredits: 900,
      cobenefits: ['Women Empowerment', 'Eco-tourism'],
      verificationDate: '2024-01-22',
      impact: {
        hectares: 12.8,
        trees: 2890,
        community: 156
      }
    }
  ];

  const handlePurchaseCredits = (creditId: number, quantity: number, totalCost: number) => {
    setUserBalance(prev => prev - totalCost);
    setUserOwnedCredits(prev => prev + quantity);
    console.log(`Purchased ${quantity} credits for ₹${totalCost}`);
  };

  const handleSellRequest = (pricePerCredit: number, quantity: number) => {
    const earnings = pricePerCredit * quantity;
    setTotalEarnings(prev => prev + earnings);
    setUserOwnedCredits(prev => prev - quantity);
    console.log(`Listed ${quantity} credits for sale at ₹${pricePerCredit} each`);
  };

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

        {/* Enhanced Marketplace */}
        <CarbonMarketplace
          credits={availableCredits}
          userBalance={userBalance}
          onPurchase={handlePurchaseCredits}
          onSellRequest={handleSellRequest}
          userOwnedCredits={userOwnedCredits}
        />

        {/* Portfolio & Reporting */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
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
                  <Button 
                    onClick={() => {
                      // Create and download ESG report
                      const reportData = {
                        company: user?.organization || 'Your Company',
                        period: 'Q4 2024',
                        totalCredits: 5420,
                        retiredCredits: 3200,
                        co2Offset: '3,200 tons',
                        mangroveArea: '45.7 hectares',
                        communitiesImpacted: 850,
                        investmentValue: '₹21.68 L',
                        projects: ownedCredits,
                        generatedDate: new Date().toLocaleDateString()
                      };
                      
                      const reportContent = `
BlueTrust ESG Impact Report
${reportData.company}
Generated: ${reportData.generatedDate}

EXECUTIVE SUMMARY
================
Reporting Period: ${reportData.period}
Total Carbon Credits Portfolio: ${reportData.totalCredits}
Carbon Credits Retired for Offsetting: ${reportData.retiredCredits}
Net CO₂ Offset Achieved: ${reportData.co2Offset}

ENVIRONMENTAL IMPACT
===================
• Mangrove Ecosystems Supported: ${reportData.mangroveArea}
• Communities Directly Impacted: ${reportData.communitiesImpacted} people
• Total Investment in Blue Carbon: ${reportData.investmentValue}

DETAILED PORTFOLIO BREAKDOWN
============================
${reportData.projects.map(credit => `
Project: ${credit.project}
Credits Owned: ${credit.credits}
Purchase Date: ${credit.purchaseDate}
Value: ${credit.value}
Status: ${credit.status.toUpperCase()}
`).join('')}

VERIFICATION & COMPLIANCE
========================
• All carbon credits are verified by Government of India certifiers
• Blockchain recorded for transparency and auditability
• Meets CDP, GRI, and TCFD reporting standards
• Real-time satellite monitoring ensures project integrity

SUSTAINABILITY COMMITMENTS
==========================
Through BlueTrust, ${reportData.company} is contributing to:
✓ UN Sustainable Development Goals (SDG 13, 14, 15)
✓ India's Nationally Determined Contributions (NDCs)
✓ Corporate Net Zero commitments
✓ Biodiversity conservation and community empowerment

This report demonstrates ${reportData.company}'s commitment to environmental stewardship and sustainable business practices through verified blue carbon investments.
                      `;
                      
                      const blob = new Blob([reportContent], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = `${user?.organization || 'Company'}_ESG_Report_Q4_2024.txt`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      URL.revokeObjectURL(url);
                    }}
                    className="w-full gradient-ocean text-white font-semibold"
                  >
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